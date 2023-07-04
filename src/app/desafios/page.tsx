import { db } from '@/configs/db'
import { ChallengeForm } from '@components/Challenges/ChallengeForm'

export default async function Desafios() {
	const challenges = (await db.project.findMany({
		include: {
			difficulty: true,
			technologies: true
		}
	})) as Project[]

	return (
		<main className='my-20'>
			<ChallengeForm challenges={challenges} />
		</main>
	)
}
