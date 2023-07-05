import { getChallenges } from '@actions/getChallenges'
import { ChallengeList } from '@components/Dashboard/ChallengeList'

export default async function Dashboard() {
	const challenges = await getChallenges()

	return (
		<main>
			<div className='my-20'>
				<ChallengeList challenges={challenges} />
			</div>
		</main>
	)
}
