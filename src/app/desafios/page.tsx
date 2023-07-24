import { getChallenges } from '@actions/getChallenges'
import { ChallengeForm } from '@components/Challenges/ChallengeForm'

export default async function Desafios() {
	const challenges = await getChallenges(undefined, {
		difficulty: 'include',
		technologies: 'include'
	})

	return (
		<main className='my-20'>
			<ChallengeForm challenges={challenges} />
		</main>
	)
}
