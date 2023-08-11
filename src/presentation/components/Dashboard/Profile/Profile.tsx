'use client'

import React from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Label } from '@components/ui/label'
import { Input } from '@components/ui/input'
import { Loading } from '@components/Loading'
import { Button } from '@components/ui/button'
import { ProfileSchemaLinks } from '@/validations'
import { useToast } from '@components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

type ProfileLinksData = z.infer<typeof ProfileSchemaLinks>

interface ProfileData {
	user: User | null
}

export const Profile: React.FC<ProfileData> = ({ user }) => {
	const router = useRouter()
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
			router.refresh()
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
				<Loading
					title='Atualizando Perfil'
					subtitle='Aguarde enquanto seu perfil é atualizado.'
				/>
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
						<div>
							<Label htmlFor='github'>Github</Label>
							<Input
								type='text'
								id='github'
								defaultValue={links.github?.url}
								placeholder='https://github.com/username'
								{...register('github')}
							/>
						</div>

						<div>
							<Label htmlFor='linkedin'>Linkedin</Label>
							<Input
								type='text'
								id='linkedin'
								defaultValue={links.linkedin?.url}
								placeholder='https://linkedin.com/in/username'
								{...register('linkedin')}
							/>
						</div>

						<div>
							<Label htmlFor='website'>Website / Portfólio</Label>
							<Input
								type='text'
								id='website'
								defaultValue={links.website?.url}
								placeholder='https://personal-website.com'
								{...register('website')}
							/>
						</div>
					</form>
				</div>
			</section>
		</>
	)
}
