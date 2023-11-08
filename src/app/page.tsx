import { Suspense } from 'react'
import { Hero } from '@components/Hero'
import { About } from '@components/About'
import { Discord } from '@components/Discord'
import { HowItWorks } from '@components/HowItWorks'
import { Challenges } from '@components/Challenges'
import { ChallengeCardSkeleton } from '@components/Skeleton'

export default function Home() {
	return (
		<main>
			<div className='mt-20'>
				<Hero />
			</div>
			<div className='mt-48'>
				<About />
			</div>
			<div className='my-[45px] md:my-[125px]'>
				<Discord />
			</div>
			<div className='mb-48'>
				<HowItWorks />
			</div>
			<div className='mb-[170px]'>
				<Suspense fallback={<ChallengeCardSkeleton />}>
					<Challenges />
				</Suspense>
			</div>
		</main>
	)
}
