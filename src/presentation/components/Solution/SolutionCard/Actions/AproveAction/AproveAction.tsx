'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/presentation/lib/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useToast } from '@components/ui/use-toast'
import { useSession } from '@externals/libs/auth/useSession'

interface AproveActionProps {
	id: string
	className?: string
}

export const AproveAction: React.FC<AproveActionProps> = ({ id, className }) => {
	const router = useRouter()
	const { toast } = useToast()
	const { update } = useSession()
	const [loading, setLoading] = React.useState(false)

	const handleAprove = async () => {
		try {
			setLoading(true)
			const response = await fetch(`/api/solutions/aprove/${id}`, {
				method: 'PUT',
				body: JSON.stringify({ approved: true })
			})

			await response.json()

			toast({
				title: 'Solução aprovada com sucesso!',
				description: 'A solução foi aprovada com sucesso!'
			})

			update()
			router.refresh()
			router.push('/solutions')
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Erro ao aprovar solução',
				description: 'Ocorreu um erro ao aprovar sua solução'
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
			onClick={handleAprove}>
			Aprovar
			{loading && <ReloadIcon width={20} height={20} className='animate-spin' />}
		</button>
	)
}
