'use client'

import React from 'react'
import Link from 'next/link'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { ChallengeListCard } from './ChallengeListCard'

interface ChallengesProps {
	challenges: Challenge[]
}

export const ChallengeList: React.FC<ChallengesProps> = ({ challenges }) => {
	const [challengeTitle, setChallengeTitle] = React.useState('')

	return (
		<section className='container'>
			<div className='mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
				<h1 className='text-lg font-bold uppercase leading-[46px] sm:text-xl md:text-2xl lg:text-3xl'>
					Lista de Desafios
				</h1>
				<Button asChild className='uppercase'>
					<Link href='/dashboard/project'>Criar desafio</Link>
				</Button>
			</div>

			<div className='mb-10'>
				<Input
					type='search'
					placeholder='Pesquisar desafio'
					onChange={(e) => setChallengeTitle(e.target.value)}
				/>
				<p className='mt-5 font-semibold'>Total de desafios: {challenges?.length}</p>
			</div>

			<div className='flex flex-col gap-3'>
				{challenges &&
					challenges
						.filter((challenge) => challenge.title.includes(challengeTitle))
						.map((challenge) => (
							<ChallengeListCard
								key={challenge.id}
								id={challenge.id}
								title={challenge.title}
								image={challenge.image}
								image_id={challenge.image_id}
							/>
						))}
			</div>
		</section>
	)
}
