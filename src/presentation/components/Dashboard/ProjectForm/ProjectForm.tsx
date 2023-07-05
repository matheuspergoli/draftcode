'use client'

import React from 'react'

import { z } from 'zod'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Button } from '@components/ui/button'
import { Textarea } from '@components/ui/textarea'
import { useToast } from '@components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'

import { Widget } from '@uploadcare/react-widget'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@components/ui/hover-card'

const FIGMA_REGEX =
	/https:\/\/([\w.-]+\.)?figma.com\/(file|proto)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/

const ProjectSchema = z.object({
	title: z
		.string()
		.min(6, {
			message: 'O nome do projeto deve ter no mínimo 6 caracteres'
		})
		.nonempty(),
	image: z.string(),
	brief: z.string().min(10, { message: 'A descrição deve ter no mínimo 10 caracteres' }),
	figma_url: z.string().regex(FIGMA_REGEX, {
		message: 'O link do figma deve ser válido'
	}),
	difficulty: z.string().nonempty({
		message: 'O nível do projeto deve ser informado'
	}),
	description: z.string().min(10, {
		message: 'A descrição deve ter no mínimo 10 caracteres'
	}),
	technologies: z.string().transform((value) => {
		if (typeof value === 'string') {
			return value.split(' ')
		}
	})
})

type ProjectData = z.infer<typeof ProjectSchema>

export default function ProjectForm() {
	const { toast } = useToast()
	const UPLOADCARE_API_KEY = process.env.NEXT_PUBLIC_UPLOADCARE_PUB_KEY as string

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ProjectData>({
		resolver: zodResolver(ProjectSchema)
	})

	const onSubmit = async (data: ProjectData) => {
		try {
			const response = await fetch('/api/project', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			await response.json()

			toast({
				title: 'Projeto criado com sucesso',
				description: 'Seu projeto foi criado com sucesso'
			})

			reset()
		} catch (error) {
			toast({
				title: 'Erro ao criar projeto',
				description: 'Verifique os campos e tente novamente'
			})
		}
	}

	React.useEffect(() => {
		if (Object.entries(errors).length > 0) {
			toast({
				title: 'Erro ao criar projeto',
				description: 'Verifique os campos e tente novamente'
			})
		}
	}, [errors, toast])

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='container'>
			<div className='mb-10 gap-10 md:flex'>
				<div className='hidden max-w-xs md:block'>
					<h3 className='text-2xl font-bold leading-[46px]'>Nome, Linguagem e Nível</h3>
					<p>Insira o nome do desafio, sua linguagem e nível requerido</p>
				</div>
				<div className='flex-1'>
					<HoverCard>
						<div className='mb-3 flex flex-col gap-2'>
							<Label htmlFor='nome-desafio'>Nome do Desafio</Label>
							<HoverCardTrigger>
								<Input
									id='name-desafio'
									type='text'
									placeholder='Nome do Desafio'
									{...register('title')}
								/>
							</HoverCardTrigger>
							<HoverCardContent>Escolha um nome para o desafio</HoverCardContent>
						</div>
					</HoverCard>

					<div className='flex gap-5'>
						<HoverCard>
							<div className='flex w-full flex-col gap-2'>
								<Label htmlFor='linguagem-desafio'>Linguagem</Label>
								<HoverCardTrigger>
									<Input
										id='linguagem-desafio'
										type='text'
										placeholder='Linguagens'
										{...register('technologies')}
									/>
								</HoverCardTrigger>
								<HoverCardContent>
									Escolha uma ou mais linguagens para o desafio separadas por espaço
								</HoverCardContent>
							</div>
						</HoverCard>

						<HoverCard>
							<div className='flex w-full flex-col gap-2'>
								<Label htmlFor='nivel-desafio'>Nível</Label>
								<HoverCardTrigger>
									<Input
										id='nivel-desafio'
										type='text'
										placeholder='Nível'
										{...register('difficulty')}
									/>
								</HoverCardTrigger>
								<HoverCardContent>
									Escolha um nível para o desafio (Iniciante, Intermediário, Avançado)
								</HoverCardContent>
							</div>
						</HoverCard>
					</div>
				</div>
			</div>

			<div className='mb-10 flex flex-col gap-10 md:flex-row'>
				<div className='hidden max-w-xs md:block'>
					<h3 className='text-2xl font-bold leading-[46px]'>Imagem</h3>
					<p>Insira uma Imagem que mostre a tela final do desafio</p>
				</div>
				<div className='flex-1'>
					{/* <Label htmlFor='imagem-desafio'>Adicionar imagem</Label> */}
					<Controller
						control={control}
						name='image'
						rules={{ required: 'Imagem é obrigatório' }}
						render={({ field: { onChange, ...field } }) => {
							return (
								<Widget
									{...field}
									imagesOnly
									locale='pt'
									clearable
									publicKey={UPLOADCARE_API_KEY}
									onChange={(file) => {
										onChange(file.cdnUrl as string)
									}}
								/>
							)
						}}
					/>
				</div>
			</div>

			<div className='mb-10 flex flex-col gap-10 md:flex-row'>
				<div className='hidden max-w-xs md:block'>
					<h3 className='text-2xl font-bold leading-[46px]'>Link para o Figma</h3>
					<p>Utilize um link que leve ao figma do desafio para ser utilizado</p>
				</div>
				<HoverCard>
					<div className='flex-1'>
						<Label htmlFor='figma-desafio'>Figma</Label>
						<HoverCardTrigger>
							<Input
								id='figma-desafio'
								type='text'
								placeholder='Link para o Figma'
								{...register('figma_url')}
							/>
						</HoverCardTrigger>
						<HoverCardContent>
							Insira um link para o figma do desafio, deve ser um link válido
						</HoverCardContent>
					</div>
				</HoverCard>
			</div>

			<div className='mb-10 flex flex-col gap-10 md:flex-row'>
				<div className='hidden max-w-xs md:block'>
					<h3 className='text-2xl font-bold leading-[46px]'>Descrição</h3>
					<p>Insira uma descrição sobre o desafio, informe o objetivo do mesmo</p>
				</div>
				<HoverCard>
					<div className='flex-1'>
						<Label htmlFor='descricao-desafio'>Descrição</Label>
						<HoverCardTrigger>
							<Textarea
								{...register('brief')}
								id='descricao-desafio'
								className='whitespace-pre-wrap'
								placeholder='Neste desafio, você será desafiado a criar um formulário de login responsivo usando HTML, CSS e JavaScript. O formulário deve ter uma aparência agradável em dispositivos de desktop e móveis e deve ser fácil de usar para os usuários.'
								rows={10}
							/>
						</HoverCardTrigger>
						<HoverCardContent>
							Insira uma descrição sobre o desafio, informe o objetivo do mesmo
						</HoverCardContent>
					</div>
				</HoverCard>
			</div>

			<div className='mb-10 flex flex-col gap-10 md:flex-row'>
				<div className='hidden max-w-xs md:block'>
					<h3 className='text-2xl font-bold leading-[46px]'>Requisitos</h3>
					<p>
						Informe para os usuarios as tasks que devem ser completadas para finalizar o
						desafio
					</p>
				</div>
				<HoverCard>
					<div className='flex-1'>
						<Label htmlFor='requisitos-desafio'>Requisitos</Label>
						<HoverCardTrigger>
							<Textarea
								{...register('description')}
								className='whitespace-pre-wrap'
								id='requisitos-desafio'
								placeholder='Você deve criar uma interface de usuário para um aplicativo de lista de tarefas simples. Ele deve consistir em um campo de entrada de texto, um botão "Adicionar" e uma lista de tarefas. Cada item da lista deve ter um botão "Excluir" que remova o item da lista. Você deve usar HTML, CSS e JavaScript para este projeto. Você não deve usar bibliotecas ou frameworks.'
								rows={10}
							/>
						</HoverCardTrigger>
						<HoverCardContent>
							Informe para os usuarios as tasks que devem ser completadas para finalizar o
							desafio
						</HoverCardContent>
					</div>
				</HoverCard>
			</div>

			<Button className='mx-auto block w-fit uppercase md:ml-auto md:mr-0'>Criar</Button>
		</form>
	)
}
