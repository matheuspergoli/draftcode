import { db } from '@/configs/db'
import { ChallengeList } from '@components/Dashboard/ChallengeList'

export default async function Dashboard() {
	const challenges = (await db.project.findMany()) as Project[]

	return (
		<main>
			<div className='my-20'>
				<ChallengeList challenges={challenges} />
			</div>
		</main>
	)
}
