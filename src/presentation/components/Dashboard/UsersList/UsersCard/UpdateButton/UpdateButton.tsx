'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
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

interface UpdateButtonProps {
	id: string
}

export const UpdateButton: React.FC<UpdateButtonProps> = ({ id }) => {
	const router = useRouter()
	const { toast } = useToast()
	const [role, setRole] = React.useState('USER')
	const [loading, setLoading] = React.useState(false)

	const handleUpdate = async () => {
		setLoading(true)
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
		</>
	)
}
