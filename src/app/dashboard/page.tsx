import dynamic from 'next/dynamic'

import { getChallenges } from '@actions/getChallenges'
import { getUserSession } from '@actions/getUserSession'

const ChallengeList = dynamic(
	() => import('@components/Dashboard/ChallengeList/ChallengeList')
)

export default async function Dashboard() {
	let challenges = null

	const session = await getUserSession()

	if (session?.user.role === 'SUPERADMIN') {
		challenges = await getChallenges()
	} else if (session?.user.role === 'ADMIN') {
		challenges = await getChallenges(session.user.id)
	}

	return (
		<main>
			<div className='my-20'>
				<ChallengeList challenges={challenges as Project[]} />
			</div>
		</main>
	)
}
