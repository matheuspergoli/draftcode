'use client'

import React from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Loading } from '@components/Loading'
import { Button } from '@components/ui/button'
import { ProjectSchemaUpdate } from '@/validations'
import { useToast } from '@components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateChallenge } from '@hooks/challenges'
import { FormInput, FormTextarea } from '@components/Form'

type ProjectData = z.infer<typeof ProjectSchemaUpdate>

export const ProjectFormUpdate: React.FC<Challenge> = (challenge) => {
	const router = useRouter()
	const { toast } = useToast()
	const { loading, updateChallenge } = useUpdateChallenge<ProjectData>(challenge)

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors }
	} = useForm<ProjectData>({
		resolver: zodResolver(ProjectSchemaUpdate)
	})

	const image = watch('image')

	const onSubmit = async (data: ProjectData) => {
		try {
			await updateChallenge(data)

			toast({
				title: 'Projeto atualizado com sucesso',
				description: 'Seu projeto foi atualizado com sucesso'
			})

			reset()
			router.refresh()
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

	return (
		<>
			{loading && (
				<Loading
					title='Atualizando Projeto'
					subtitle='Aguarde enquanto seu projeto é atualizado.'
				/>
			)}
			<form onSubmit={handleSubmit(onSubmit)} className='container'>
				<div className='mb-10 gap-10 md:flex'>
					<div className='hidden w-full max-w-xs md:block'>
						<h3 className='text-2xl font-bold leading-[46px]'>Nome, Linguagem e Nível</h3>
						<p>Insira o nome do desafio, sua linguagem e nível requerido</p>
					</div>
					<div className='flex-1'>
						<FormInput
							htmlFor='nome-desafio'
							type='text'
							defaultValue={challenge?.title}
							label='Nome do Desafio'
							placeholder='Nome do Desafio'
							helperText='Escolha um nome para o desafio entre 6 e 45 caracteres'
							{...register('title')}
						/>

						<div className='flex gap-5'>
							<FormInput
								htmlFor='linguagem-desafio'
								type='text'
								defaultValue={challenge.technologies?.map((tech) => tech.name).join(' ')}
								label='Linguagem'
								placeholder='Linguagens'
								helperText='Escolha uma ou mais linguagens para o desafio separadas por espaço'
								{...register('technologies')}
							/>

							<FormInput
								htmlFor='nivel-desafio'
								type='text'
								defaultValue={challenge.difficulty?.name}
								label='Nível'
								placeholder='Nível'
								helperText='Escolha um nível para o desafio (Iniciante, Intermediário, Avançado)'
								{...register('difficulty')}
							/>
						</div>
					</div>
				</div>

				<div className='mb-10 flex flex-col gap-10 md:flex-row'>
					<div className='hidden w-full max-w-xs md:block'>
						<h3 className='text-2xl font-bold leading-[46px]'>Imagem</h3>
						<p>Insira uma Imagem que mostre a tela final do desafio</p>
					</div>
					<div className='flex-1'>
						<FormInput
							htmlFor='imagem-desafio'
							type='file'
							label='Imagem do desafio'
							placeholder='Imagem do desafio'
							helperText='Insira uma imagem que demonstre o desafio'
							{...register('image')}
						/>

						{challenge?.image && (
							<img
								src={image?.[0] ? URL.createObjectURL(image[0]) : challenge.image}
								alt='Imagem do desafio'
								className='mt-5 w-full'
							/>
						)}
					</div>
				</div>

				<div className='mb-10 flex flex-col gap-10 md:flex-row'>
					<div className='hidden w-full max-w-xs md:block'>
						<h3 className='text-2xl font-bold leading-[46px]'>Link para o Figma</h3>
						<p>Utilize um link que leve ao figma do desafio para ser utilizado</p>
					</div>

					<FormInput
						htmlFor='figma-desafio'
						type='text'
						defaultValue={challenge?.figma_url}
						label='Figma'
						placeholder='Link para o Figma'
						helperText='Insira um link para o figma do desafio, deve ser um link válido'
						{...register('figma_url')}
					/>
				</div>

				<div className='mb-10 flex flex-col gap-10 md:flex-row'>
					<div className='hidden w-full max-w-xs md:block'>
						<h3 className='text-2xl font-bold leading-[46px]'>Descrição</h3>
						<p>Insira uma descrição sobre o desafio, informe o objetivo do mesmo</p>
					</div>

					<FormTextarea
						htmlFor='descricao-desafio'
						label='Descrição'
						defaultValue={challenge?.brief}
						placeholder='Neste desafio, você será desafiado a criar um formulário de login responsivo usando HTML, CSS e JavaScript. O formulário deve ter uma aparência agradável em dispositivos de desktop e móveis e deve ser fácil de usar para os usuários.'
						helperText='Insira uma descrição entre 10 e 120 caracteres sobre o desafio, informe o objetivo do mesmo'
						{...register('brief')}
					/>
				</div>

				<div className='mb-10 flex flex-col gap-10 md:flex-row'>
					<div className='hidden w-full max-w-xs md:block'>
						<h3 className='text-2xl font-bold leading-[46px]'>Requisitos</h3>
						<p>
							Informe para os usuarios as tasks que devem ser completadas para finalizar o
							desafio
						</p>
					</div>

					<FormTextarea
						htmlFor='requisitos-desafio'
						label='Requisitos'
						defaultValue={challenge?.description}
						placeholder='Você deve criar uma interface de usuário para um aplicativo de lista de tarefas simples. Ele deve consistir em um campo de entrada de texto, um botão "Adicionar" e uma lista de tarefas. Cada item da lista deve ter um botão "Excluir" que remova o item da lista. Você deve usar HTML, CSS e JavaScript para este projeto. Você não deve usar bibliotecas ou frameworks.'
						helperText='Informe para os usuarios as tasks que devem ser completadas para finalizar o
					desafio'
						{...register('description')}
					/>
				</div>

				<Button className='mx-auto block w-fit uppercase md:ml-auto md:mr-0'>
					Atualizar
				</Button>
			</form>
		</>
	)
}
