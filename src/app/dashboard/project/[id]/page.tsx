import { redirect } from 'next/navigation'
import { getChallenge } from '@actions/getChallenge'
import { getUserSession } from '@actions/getUserSession'
import { ProjectFormUpdate } from '@components/Dashboard/ProjectForm/ProjectFormUpdate'

export default async function Project({ params }: { params: { id: string } }) {
	const session = await getUserSession()
	const challenge = await getChallenge(params.id, {
		difficulty: 'include',
		technologies: 'include'
	})

	if (challenge.user_id !== session?.user.id) {
		if (session?.user.role !== 'SUPERADMIN') {
			redirect('/dashboard')
		}
	}

	return (
		<main>
			<div className='my-20'>
				<ProjectFormUpdate {...challenge} />
			</div>
		</main>
	)
}
