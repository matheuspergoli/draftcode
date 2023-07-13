'use client'

import React from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { ProfileSchemaLinks } from '@/validations'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useToast } from '@components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

type ProfileLinksData = z.infer<typeof ProfileSchemaLinks>

interface ProfileData {
	user: User | null
}

export const Profile: React.FC<ProfileData> = ({ user }) => {
	const { toast } = useToast()
	const [loading, setLoading] = React.useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ProfileLinksData>({
		resolver: zodResolver(ProfileSchemaLinks)
	})

	const onSubmit = async (data: ProfileLinksData) => {
		try {
			setLoading(true)
			const response = await fetch('/api/profile', {
				method: 'POST',
				body: JSON.stringify(data)
			})

			await response.json()

			toast({
				title: 'Perfil atualizado com sucesso',
				description: 'Seu perfil foi atualizado com sucesso'
			})

			setLoading(false)
		} catch (error) {
			setLoading(false)
			toast({
				variant: 'destructive',
				title: 'Erro ao atualizar perfil',
				description: 'Verifique os campos e tente novamente'
			})
		}
	}

	const links = {
		github: user?.social_media?.filter((social) => social.type === 'GITHUB')[0],
		website: user?.social_media?.filter((social) => social.type === 'WEBSITE')[0],
		linkedin: user?.social_media?.filter((social) => social.type === 'LINKEDIN')[0]
	}

	React.useEffect(() => {
		if (Object.entries(errors).length > 0) {
			toast({
				variant: 'destructive',
				title: 'Erro ao atualizar perfil',
				description: errors[Object.keys(errors)[0] as keyof typeof errors]?.message
			})
		}
	}, [errors, toast])

	return (
		<>
			{loading && (
				<div className='fixed inset-0 z-50 flex items-center justify-center'>
					<div className='absolute inset-0 bg-background opacity-80' />
					<div className='relative'>
						<div className='rounded-lg border border-border bg-[#1F1F1F] p-10 text-foreground'>
							<h1 className='text-2xl font-bold'>
								Atualizando Perfil
								<ReloadIcon className='ml-2 inline-block h-6 w-6 animate-spin' />
							</h1>
							<p className='mt-5'>Aguarde enquanto seu perfil é atualizado.</p>
						</div>
					</div>
				</div>
			)}
			<section className='container'>
				<div className='mb-5 flex flex-col items-center gap-5 border-b-2 pb-5 md:flex-row md:justify-between'>
					<h1 className='text-2xl font-bold'>Detalhes do Perfil</h1>
					<Button onClick={handleSubmit(onSubmit)} className='w-full md:w-fit'>
						Atualizar
					</Button>
				</div>
				<div className='mb-5 flex flex-col gap-5 border-b-2 pb-5 md:flex-row'>
					<div className='flex-1'>
						<h2 className='text-xl font-bold'>Redes Sociais</h2>
						<p className='text-xs'>Adicione suas redes sociais</p>
					</div>
					<form className='flex flex-col gap-5 md:flex-1'>
						<Input
							type='text'
							defaultValue={links.github?.url}
							placeholder='https://github.com/username'
							{...register('github')}
						/>
						<Input
							type='text'
							defaultValue={links.linkedin?.url}
							placeholder='https://linkedin.com/in/username'
							{...register('linkedin')}
						/>
						<Input
							type='text'
							defaultValue={links.website?.url}
							placeholder='https://personal-website.com'
							{...register('website')}
						/>
					</form>
				</div>
			</section>
		</>
	)
}
