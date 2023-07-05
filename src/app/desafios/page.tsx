import { getChallenges } from '@actions/getChallenges'
import { ChallengeForm } from '@components/Challenges/ChallengeForm'

export const revalidate = 60 * 60 * 2 // 2 hours

export default async function Desafios() {
	const challenges = await getChallenges()

	return (
		<main className='my-20'>
			<ChallengeForm challenges={challenges} />
		</main>
	)
}
