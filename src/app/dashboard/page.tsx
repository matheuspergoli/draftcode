import { getChallenges } from '@actions/getChallenges'
import { getUserSession } from '@actions/getUserSession'
import { getAdminChallenges } from '@actions/getAdminChallenges'
import { ChallengeList } from '@components/Dashboard/ChallengeList'

export default async function Dashboard() {
	let challenges = null as unknown as Project[]
	const session = await getUserSession()

	if (session?.user.role === 'ADMIN') {
		challenges = await getAdminChallenges(session.user.id)
	} else if (session?.user.role === 'SUPERADMIN') {
		challenges = await getChallenges()
	}

	return (
		<main>
			<div className='my-20'>
				<ChallengeList challenges={challenges} />
			</div>
		</main>
	)
}
