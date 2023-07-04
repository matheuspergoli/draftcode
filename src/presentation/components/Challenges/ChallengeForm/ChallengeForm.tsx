'use client'

import React from 'react'
import { ChallengesCard } from '../ChallengeCard'
import { remove as removeAccents } from 'remove-accents'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@components/ui/select'

interface ChallengeFormProps {
	challenges: Project[]
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
			<div className='mb-7 flex items-center gap-5'>
				<h1 className='text-2xl font-bold md:text-4xl'>Desafios</h1>
				<Select
					defaultValue='todos'
					onValueChange={(difficulty) => setSelectedDifficulty(difficulty)}>
					<SelectTrigger className='w-[180px]'>
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

			<article className='grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3'>
				{renderChallenges()}
			</article>
		</section>
	)
}
