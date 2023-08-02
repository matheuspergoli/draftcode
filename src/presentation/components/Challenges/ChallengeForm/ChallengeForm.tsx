'use client'

import React from 'react'
import { Button } from '@components/ui/button'
import { ChallengesCard } from '../ChallengeCard'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { remove as removeAccents } from 'remove-accents'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@components/ui/select'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose
} from '@components/ui/dialog'

interface ChallengeFormProps {
	challenges: Challenge[]
}

export const ChallengeForm: React.FC<ChallengeFormProps> = ({ challenges }) => {
	const [selectedDifficulty, setSelectedDifficulty] = React.useState('')

	const formatedDifficulty = (difficulty: string) => {
		return removeAccents(difficulty).trim().toLowerCase()
	}

	const renderChallenges = () => {
		if (selectedDifficulty === 'todos') {
			return challenges.map((challenge) => (
				<ChallengesCard
					key={challenge.id}
					id={challenge.id}
					title={challenge.title}
					brief={challenge.brief}
					difficulty={challenge.difficulty.name}
					image={challenge.image}
					technologies={challenge.technologies.map((tech) => tech.name)}
				/>
			))
		}

		if (!selectedDifficulty) {
			return challenges.map((challenge) => (
				<ChallengesCard
					key={challenge.id}
					id={challenge.id}
					title={challenge.title}
					brief={challenge.brief}
					difficulty={challenge.difficulty.name}
					image={challenge.image}
					technologies={challenge.technologies.map((tech) => tech.name)}
				/>
			))
		}

		return challenges
			.filter(
				(challenge) =>
					formatedDifficulty(challenge.difficulty.name) ===
					formatedDifficulty(selectedDifficulty)
			)
			.map((challenge) => (
				<ChallengesCard
					key={challenge.id}
					id={challenge.id}
					title={challenge.title}
					brief={challenge.brief}
					difficulty={challenge.difficulty.name}
					image={challenge.image}
					technologies={challenge.technologies.map((tech) => tech.name)}
				/>
			))
	}

	return (
		<section className='container'>
			<div className='mb-7 flex flex-col items-center justify-between gap-5 sm:flex-row sm:gap-0'>
				<div className='flex items-center gap-5'>
					<h1 className='text-2xl font-bold md:text-4xl'>Desafios</h1>
					<Select
						name='difficulty'
						defaultValue='todos'
						onValueChange={(difficulty) => setSelectedDifficulty(difficulty)}>
						<SelectTrigger aria-label='Dificuldade' className='w-[180px]'>
							<SelectValue placeholder='Dificuldade' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='todos'>Todos</SelectItem>
							<SelectItem value='iniciante'>Iniciante</SelectItem>
							<SelectItem value='intermediario'>Intermediário</SelectItem>
							<SelectItem value='avancado'>Avançado</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Dialog>
					<DialogTrigger asChild>
						<Button variant='ghost' className='gap-2'>
							Sobre nossos desafios
							<InfoCircledIcon className='h-5 w-5' />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								<h2 className='text-2xl font-bold'>Como funcionam nossos desafios:</h2>
							</DialogTitle>
							<DialogDescription className='h-full max-h-[300px] overflow-y-auto md:max-h-[500px]'>
								<section className='text-base text-[#8C8C8C]'>
									Nossos desafios são projetos de programação que ajudam desenvolvedores a
									aprimorar suas habilidades. Os desafios são divididos em três níveis de
									dificuldade:
									<article className='mt-4'>
										<p className='underline'>- Iniciante</p>
										<p className='underline'>- Intermediário</p>
										<p className='underline'>- Avançado</p>
									</article>
								</section>

								<p className='mt-5 text-base text-[#8C8C8C]'>
									Nossos desafios têm tecnologias padrões recomendadas, mas você tem total
									liberdade para escolher qualquer tecnologia frontend que preferir.
								</p>

								<p className='mt-5 text-base text-[#8C8C8C]'>
									Você pode resolver os desafios no seu próprio ritmo. Tome o tempo que
									precisar para entender os conceitos.
								</p>

								<p className='mt-5 text-base text-[#8C8C8C]'>
									Temos uma comunidade colaborativa de programadores frontend. Se você
									tiver alguma dúvida, dificuldade ou quiser compartilhar sua solução,{' '}
									<a
										target='_blank'
										rel='noreferrer'
										href='https://discord.gg/svsgUgAvcx'
										className='underline'>
										acesse nossa comunidade no discord.
									</a>
								</p>
							</DialogDescription>
						</DialogHeader>
						<DialogClose>Fechar</DialogClose>
					</DialogContent>
				</Dialog>
			</div>

			<article className='grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:place-items-stretch'>
				{renderChallenges()}
			</article>
		</section>
	)
}
