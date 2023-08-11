'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
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
				<div className='fixed inset-0 z-50 flex items-center justify-center'>
					<div className='absolute inset-0 bg-background opacity-80' />
					<div className='relative'>
						<div className='rounded-lg border border-border bg-[#1F1F1F] p-10 text-foreground'>
							<h1 className='text-2xl font-bold'>
								Atualizando Usuário
								<ReloadIcon className='ml-2 inline-block h-6 w-6 animate-spin' />
							</h1>
							<p className='mt-5'>Aguarde enquanto o usuário é atualizado.</p>
						</div>
					</div>
				</div>
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
