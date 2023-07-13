'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@components/ui/button'
import { useToast } from '@components/ui/use-toast'
import { ReloadIcon } from '@radix-ui/react-icons'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose
} from '@components/ui/dialog'

interface DeleteButtonProps {
	id: string
	image_id: string
}

const BACKEND_UPLOAD_URL = process.env.NEXT_PUBLIC_BACKEND_UPLOAD_URL

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, image_id }) => {
	const router = useRouter()
	const { toast } = useToast()
	const [loading, setLoading] = React.useState(false)

	console.log(image_id)

	const handleDelete = async () => {
		try {
			setLoading(true)
			await fetch(`/api/project/${id}`, {
				method: 'DELETE'
			})

			await fetch(`${BACKEND_UPLOAD_URL}/image-upload/delete`, {
				method: 'DELETE',
				body: JSON.stringify({ public_id: image_id })
			})

			toast({
				title: 'Projeto apagado com sucesso',
				description: 'Seu projeto foi apagado com sucesso'
			})

			setLoading(false)
			router.refresh()
		} catch (error) {
			toast({
				title: 'Erro ao apagar projeto',
				description: 'Tente novamente'
			})

			setLoading(false)
		}
	}

	return (
		<>
			{loading && (
				<div className='fixed inset-0 z-50 flex items-center justify-center'>
					<div className='absolute inset-0 bg-background opacity-80' />
					<div className='relative'>
						<div className='rounded-lg border border-border bg-[#1F1F1F] p-10 text-foreground'>
							<h1 className='text-2xl font-bold'>
								Excluindo Projeto
								<ReloadIcon className='ml-2 inline-block h-6 w-6 animate-spin' />
							</h1>
							<p className='mt-5'>Aguarde enquanto seu projeto é excluido.</p>
						</div>
					</div>
				</div>
			)}
			<Dialog>
				<DialogTrigger asChild>
					<Button>Apagar</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Deseja excluir esse projeto?</DialogTitle>
						<DialogDescription>
							Essa ação não pode ser desfeita. Tem certeza que deseja excluir esse projeto
							de nossos servidores?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button onClick={() => handleDelete()}>Confirmar</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
