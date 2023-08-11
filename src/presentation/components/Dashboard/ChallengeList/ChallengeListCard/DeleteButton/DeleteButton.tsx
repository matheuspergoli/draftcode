'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Loading } from '@components/Loading'
import { Button } from '@components/ui/button'
import { useToast } from '@components/ui/use-toast'

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

	const handleDelete = async () => {
		try {
			setLoading(true)
			await fetch(`/api/project/${id}`, {
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
				<Loading
					title='Excluindo Projeto'
					subtitle='Aguarde enquanto seu projeto é excluido.'
				/>
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
