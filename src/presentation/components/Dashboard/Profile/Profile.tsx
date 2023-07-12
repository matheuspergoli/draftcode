'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { ProfileSchemaLinks } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'

type ProfileLinksData = z.infer<typeof ProfileSchemaLinks>

export const Profile: React.FC = () => {
	const onSubmit = async (data: ProfileLinksData) => {
		const response = await fetch('/api/profile', {
			method: 'POST',
			body: JSON.stringify(data)
		})

		await response.json()
	}

	const { register, handleSubmit } = useForm<ProfileLinksData>({
		resolver: zodResolver(ProfileSchemaLinks)
	})

	return (
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
						placeholder='https://github.com/username'
						{...register('github')}
					/>
					<Input
						type='text'
						placeholder='https://linkedin.com/in/username'
						{...register('linkedin')}
					/>
					<Input
						type='text'
						placeholder='https://personal-website.com'
						{...register('website')}
					/>
				</form>
			</div>
		</section>
	)
}
