'use client'

import React from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { FormInput } from '@components/Form'
import { Button } from '@components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useToast } from '@components/ui/use-toast'
import { SolutionSchemaCreate } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'

type SolutionData = z.infer<typeof SolutionSchemaCreate>

const BACKEND_UPLOAD_URL = process.env.NEXT_PUBLIC_BACKEND_UPLOAD_URL

interface SolutionFormCreateProps {
	projectId: string
}

export const SolutionFormCreate: React.FC<SolutionFormCreateProps> = ({ projectId }) => {
	const router = useRouter()
	const { toast } = useToast()
	const [loading, setLoading] = React.useState(false)

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
		const formData = new FormData()

		formData.append('image', data.image[0])

		try {
			setLoading(true)
			const responseImage = await fetch(`${BACKEND_UPLOAD_URL}/image-upload`, {
				method: 'POST',
				body: formData
			})
			const imageJson = (await responseImage.json()) as { url: string; public_id: string }

			const solution = {
				...data,
				image: imageJson.url,
				image_id: imageJson.public_id
			}

			const response = await fetch(`/api/solutions/${projectId}`, {
				method: 'POST',
				body: JSON.stringify(solution)
			})

			await response.json()

			toast({
				title: 'Projeto enviado com sucesso',
				description: 'Seu projeto foi enviado com sucesso'
			})

			setLoading(false)
			reset()
			router.refresh()
			router.push('/solutions')
		} catch (error) {
			setLoading(false)
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
				<div className='fixed inset-0 z-50 flex items-center justify-center'>
					<div className='absolute inset-0 bg-background opacity-80' />
					<div className='relative'>
						<div className='rounded-lg border border-border bg-[#1F1F1F] p-10 text-foreground'>
							<h1 className='text-2xl font-bold'>
								Enviando Projeto
								<ReloadIcon className='ml-2 inline-block h-6 w-6 animate-spin' />
							</h1>
							<p className='mt-5'>Aguarde enquanto seu projeto é enviado.</p>
						</div>
					</div>
				</div>
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
