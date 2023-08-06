import { getChallenges } from '@actions/getChallenges'
import { ChallengeForm } from '@components/Challenges/ChallengeForm'

export const revalidate = 3600 // 1 hour

export default async function Desafios() {
	const challenges = await getChallenges({
		difficulty: 'include',
		technologies: 'include'
	})

	return (
		<main className='my-20'>
			<ChallengeForm challenges={challenges} />
		</main>
	)
}
