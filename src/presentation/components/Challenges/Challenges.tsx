'use client'

import Link from 'next/link'
import { Slider } from './Slider'
import { Button } from '@components/ui/button'
import { ChallengesCard } from './ChallengeCard'
import { ArrowRightIcon } from '@radix-ui/react-icons'

interface ChallengesProps {
	challenges: Project[]
}

export const Challenges: React.FC<ChallengesProps> = ({ challenges }) => {
	return (
		<section className='container'>
			<div className='mb-10 flex items-center justify-between gap-1'>
				<h2 className='text-lg font-bold leading-normal sm:text-[26px] md:text-[32px]'>
					Desafios recentes
				</h2>

				<Button asChild variant='ghost' className='font-bold'>
					<Link
						href='/desafios'
						className='group/btn-icon flex items-center gap-1 leading-6 text-foreground sm:gap-2'>
						Ver todos
						<ArrowRightIcon className='h-5 w-5 text-primary transition group-hover/btn-icon:rotate-90 group-hover/btn-icon:text-foreground' />
					</Link>
				</Button>
			</div>

			<Slider>
				{challenges &&
					challenges?.map((challenge) => (
						<ChallengesCard
							key={challenge.id}
							id={challenge.id}
							title={challenge.title}
							difficulty={challenge.difficulty?.name}
							image={challenge.image}
							technologies={challenge.technologies?.map((tech) => tech.name)}
						/>
					))}
			</Slider>
		</section>
	)
}
