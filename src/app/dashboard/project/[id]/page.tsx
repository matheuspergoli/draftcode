import { getChallenge } from '@actions/getChallenge'
import { ProjectFormUpdate } from '@components/Dashboard/ProjectForm/ProjectFormUpdate'

export default async function Project({ params }: { params: { id: string } }) {
	const challenge = await getChallenge(params.id, {
		difficulty: 'include',
		technologies: 'include'
	})

	return (
		<main>
			<div className='my-20'>
				<ProjectFormUpdate {...challenge} />
			</div>
		</main>
	)
}
