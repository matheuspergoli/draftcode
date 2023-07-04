'use client'

import React from 'react'
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

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@components/ui/select'

interface UpdateButtonProps {
	id: string
}

export const UpdateButton: React.FC<UpdateButtonProps> = ({ id }) => {
	const router = useRouter()
	const { toast } = useToast()
	const [role, setRole] = React.useState('USER')

	const handleUpdate = async () => {
		const response = await fetch(`/api/users/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ role }),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			toast({
				title: 'Usuário atualizado com sucesso',
				description: 'Seu usuário foi atualizado com sucesso'
			})
		} else {
			toast({
				title: 'Erro ao atualizar usuário',
				description: 'Tente novamente'
			})
		}

		router.refresh()
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Editar</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Modificar cargo</DialogTitle>
					<DialogDescription>Escolha o novo cargo para o usuário</DialogDescription>
				</DialogHeader>
				<Select defaultValue='USER' onValueChange={(role) => setRole(role)}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Cargos' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='USER'>USER</SelectItem>
						<SelectItem value='ADMIN'>ADMIN</SelectItem>
						<SelectItem value='SUPERADMIN'>SUPERADMIN</SelectItem>
					</SelectContent>
				</Select>
				<DialogFooter>
					<DialogClose asChild>
						<Button onClick={() => handleUpdate()}>Confirmar</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
