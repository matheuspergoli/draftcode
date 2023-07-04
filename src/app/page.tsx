import { db } from '@/configs/db'
import { Hero } from '@/presentation/components/Hero'
import { About } from '@/presentation/components/About'
import { Discord } from '@/presentation/components/Discord'
import { Challenges } from '@/presentation/components/Challenges'

export default async function Home() {
	const challenges = (await db.project.findMany({
		include: {
			difficulty: true,
			technologies: true
		}
	})) as Project[]

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
			<div className='mb-[170px]'>
				<Challenges challenges={challenges} />
			</div>
		</main>
	)
}
