import { Hero } from '@components/Hero'
import { About } from '@components/About'
import { Discord } from '@components/Discord'
import { HowItWorks } from '@components/HowItWorks'
import { Challenges } from '@components/Challenges'
import { getChallenges } from '@actions/getChallenges'

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
			<div className='mb-48'>
				<HowItWorks />
			</div>
			<div className='mb-[170px]'>
				<Challenges challenges={challenges} />
			</div>
		</main>
	)
}
