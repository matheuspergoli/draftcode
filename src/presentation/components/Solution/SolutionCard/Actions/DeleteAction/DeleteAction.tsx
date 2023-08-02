'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/presentation/lib/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useToast } from '@components/ui/use-toast'
import { useSession } from '@externals/libs/auth/useSession'

interface DeleteActionProps {
	id: string
	image_id: string
	className?: string
}

const BACKEND_UPLOAD_URL = process.env.NEXT_PUBLIC_BACKEND_UPLOAD_URL

export const DeleteAction: React.FC<DeleteActionProps> = ({
	id,
	className,
	image_id
}) => {
	const router = useRouter()
	const { toast } = useToast()
	const { update } = useSession()
	const [loading, setLoading] = React.useState(false)

	const handleDelete = async () => {
		try {
			setLoading(true)
			await fetch(`/api/solutions/${id}`, {
				method: 'DELETE'
			})

			await fetch(`${BACKEND_UPLOAD_URL}/image-upload/delete`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ public_id: image_id })
			})

			toast({
				title: 'Solução deletada com sucesso',
				description: 'Sua solução foi deletada com sucesso'
			})

			update()
			router.refresh()
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Erro ao deletar solução',
				description: 'Ocorreu um erro ao deletar sua solução'
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<button
			aria-label='Deletar solução'
			disabled={loading}
			className={cn(
				'flex items-center gap-2 bg-red-500 font-medium transition hover:bg-red-600 disabled:opacity-40',
				className
			)}
			onClick={handleDelete}>
			Deletar
			{loading && <ReloadIcon width={20} height={20} className='animate-spin' />}
		</button>
	)
}
