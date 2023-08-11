'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
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
	const { update } = useSession()
	const isUserBanned = isBanned ? 'Banir' : 'Desbanir'
	const [loading, setLoading] = React.useState(false)
	const [banned, setBanned] = React.useState(isUserBanned)

	const handleUpdate = async () => {
		setLoading(true)
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

			update()
			setLoading(false)
		} else {
			setLoading(false)
			toast({
				title: 'Erro ao atualizar usuário',
				description: 'Tente novamente'
			})
		}

		router.refresh()
	}

	return (
		<>
			{loading && (
				<Loading
					title='Atualizando Usuário'
					subtitle='Aguarde enquanto o usuário é atualizado.'
				/>
			)}
			<Dialog>
				<DialogTrigger asChild>
					<Button>Editar</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Banimento</DialogTitle>
						<DialogDescription>Escolha a ação que deseja realizar</DialogDescription>
					</DialogHeader>
					<Select
						defaultValue={isUserBanned}
						onValueChange={(banned) => setBanned(banned)}>
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
		</>
	)
}
