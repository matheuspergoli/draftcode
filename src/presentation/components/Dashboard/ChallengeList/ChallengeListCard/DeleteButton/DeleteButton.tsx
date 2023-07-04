'use client'

import { useRouter } from 'next/navigation'
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
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
	const router = useRouter()
	const { toast } = useToast()

	const handleDelete = async () => {
		const response = await fetch(`/api/project/${id}`, {
			method: 'DELETE'
		})

		if (response.ok) {
			toast({
				title: 'Projeto apagado com sucesso',
				description: 'Seu projeto foi apagado com sucesso'
			})
		} else {
			toast({
				title: 'Erro ao apagar projeto',
				description: 'Tente novamente'
			})
		}

		router.refresh()
	}

	return (
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
	)
}
