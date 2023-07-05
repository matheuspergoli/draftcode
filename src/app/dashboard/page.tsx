import dynamic from 'next/dynamic'

import { getChallenges } from '@actions/getChallenges'

const ChallengeList = dynamic(
	() => import('@components/Dashboard/ChallengeList/ChallengeList')
)

export const revalidate = 60 * 60 * 2 // 2 hours

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
