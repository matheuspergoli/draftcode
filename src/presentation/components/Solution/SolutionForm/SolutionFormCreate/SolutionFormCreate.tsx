'use client'

import React from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { FormInput } from '@components/Form'
import { Loading } from '@components/Loading'
import { Button } from '@components/ui/button'
import { useToast } from '@components/ui/use-toast'
import { SolutionSchemaCreate } from '@/validations'
import { useCreateSolution } from '@hooks/solutions'
import { zodResolver } from '@hookform/resolvers/zod'

type SolutionData = z.infer<typeof SolutionSchemaCreate>

interface SolutionFormCreateProps {
	challengeId: string
}

export const SolutionFormCreate: React.FC<SolutionFormCreateProps> = ({
	challengeId
}) => {
	const router = useRouter()
	const { toast } = useToast()
	const { createSolution, loading } = useCreateSolution<SolutionData>(challengeId)

	const {
		register,
		watch,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm<SolutionData>({
		resolver: zodResolver(SolutionSchemaCreate)
	})

	const onSubmit = async (data: SolutionData) => {
		try {
			await createSolution(data)

			toast({
				title: 'Projeto enviado com sucesso',
				description: 'Seu projeto foi enviado com sucesso'
			})

			reset()
			router.refresh()
			router.push('/solutions')
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Erro ao enviar projeto',
				description: 'Verifique os campos e tente novamente'
			})
		}
	}

	React.useEffect(() => {
		if (Object.entries(errors).length > 0) {
			toast({
				variant: 'destructive',
				title: 'Erro ao enviar projeto',
				description: errors[Object.keys(errors)[0] as keyof typeof errors]?.message
			})
		}
	}, [errors, toast])

	const image = watch('image')

	return (
		<>
			{loading && (
				<Loading
					title='Enviando Projeto'
					subtitle='Aguarde enquanto seu projeto é enviado.'
				/>
			)}
			<section className='container'>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
					<FormInput
						type='text'
						htmlFor='website-solucao'
						placeholder='https://www.meusite.com'
						label='Coloque o link do seu projeto'
						helperText='HOSTS SUPORTADOS: Vercel, Netlify, Github Pages, GitLab Pages, Firebase Hosting, Heroku, Surge, Repl.it, Render, Fly.io, Deno Deploy, Editor X'
						{...register('website')}
					/>
					<FormInput
						type='text'
						htmlFor='repositorio-solucao'
						placeholder='https://www.github.com/meu-repositorio'
						label='Coloque o link do seu repositório'
						helperText='Use um link para levar ao seu repositório'
						{...register('repository')}
					/>
					<FormInput
						htmlFor='imagem-solucao'
						type='file'
						placeholder='Imagem do desafio'
						label='Imagem final do seu desafio'
						helperText='Escolha uma imagem para demonstrar sua solução do desafio'
						{...register('image')}
					/>
					{image && image[0] && (
						<img
							src={URL.createObjectURL(image[0])}
							alt='Imagem do desafio'
							className='w-full'
						/>
					)}

					<Button variant='default' className='w-fit'>
						Enviar desafio
					</Button>
				</form>
			</section>
		</>
	)
}
