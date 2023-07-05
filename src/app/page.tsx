import { Hero } from '@/presentation/components/Hero'
import { getChallenges } from '@actions/getChallenges'
import { About } from '@/presentation/components/About'
import { Discord } from '@/presentation/components/Discord'
import { Challenges } from '@/presentation/components/Challenges'

export default async function Home() {
	const challenges = await getChallenges()

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
