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

interface BanButtonProps {
	id: string
	isBanned: boolean
}

export const BanButton: React.FC<BanButtonProps> = ({ id, isBanned }) => {
	const router = useRouter()
	const { toast } = useToast()
	const isUserBanned = isBanned ? 'Banir' : 'Desbanir'
	const [banned, setBanned] = React.useState(isUserBanned)

	const handleUpdate = async () => {
		const response = await fetch(`/api/users/ban/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ banned: banned }),
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
					<DialogTitle>Banimento</DialogTitle>
					<DialogDescription>Escolha a ação que deseja realizar</DialogDescription>
				</DialogHeader>
				<Select defaultValue={isUserBanned} onValueChange={(banned) => setBanned(banned)}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Banimentos' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Desbanir'>Desbanir</SelectItem>
						<SelectItem value='Banir'>Banir</SelectItem>
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
