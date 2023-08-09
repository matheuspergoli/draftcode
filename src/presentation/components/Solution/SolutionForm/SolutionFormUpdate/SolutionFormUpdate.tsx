'use client'

import React from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { FormInput } from '@components/Form'
import { Button } from '@components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useToast } from '@components/ui/use-toast'
import { SolutionSchemaUpdate } from '@/validations'
import { useUpdateSolution } from '@hooks/solutions'
import { zodResolver } from '@hookform/resolvers/zod'

type SolutionData = z.infer<typeof SolutionSchemaUpdate>

interface SolutionFormUpdateProps {
	solution: Solution
}

export const SolutionFormUpdate: React.FC<SolutionFormUpdateProps> = (props) => {
	const router = useRouter()
	const { toast } = useToast()
	const { loading, updateSolution } = useUpdateSolution<SolutionData>(props.solution)

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm<SolutionData>({
		resolver: zodResolver(SolutionSchemaUpdate)
	})

	const onSubmit = async (data: SolutionData) => {
		try {
			await updateSolution(data)

			toast({
				title: 'Projeto atualizado com sucesso',
				description: 'Seu projeto foi atua com sucesso'
			})

			router.refresh()
			router.push('/solutions')
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Erro ao atualizar projeto',
				description: 'Verifique os campos e tente novamente'
			})
		}
	}

	React.useEffect(() => {
		if (Object.entries(errors).length > 0) {
			toast({
				variant: 'destructive',
				title: 'Erro ao atualizar projeto',
				description: errors[Object.keys(errors)[0] as keyof typeof errors]
					?.message as string
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
								Atualizando Projeto
								<ReloadIcon className='ml-2 inline-block h-6 w-6 animate-spin' />
							</h1>
							<p className='mt-5'>Aguarde enquanto seu projeto é atualizado.</p>
						</div>
					</div>
				</div>
			)}
			<section className='container'>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
					<FormInput
						type='text'
						htmlFor='website-solucao'
						defaultValue={props.solution.website}
						placeholder='https://www.meusite.com'
						label='Coloque o link do seu projeto'
						helperText='HOSTS SUPORTADOS: Vercel, Netlify, Github Pages, GitLab Pages, Firebase Hosting, Heroku, Surge, Repl.it, Render, Fly.io, Deno Deploy, Editor X'
						{...register('website')}
					/>
					<FormInput
						type='text'
						htmlFor='repositorio-solucao'
						defaultValue={props.solution.repository}
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

					{props.solution.image && (
						<img
							src={image?.[0] ? URL.createObjectURL(image[0]) : props.solution.image}
							alt='Imagem do desafio'
							className='w-full'
						/>
					)}

					<Button variant='default' className='w-fit'>
						Atualizar desafio
					</Button>
				</form>
			</section>
		</>
	)
}
