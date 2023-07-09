import dynamic from 'next/dynamic'
import { getChallenge } from '@actions/getChallenge'

const ProjectFormUpdate = dynamic(
	() => import('@components/Dashboard/ProjectForm/ProjectFormUpdate/ProjectFormUpdate')
)

export default async function Project({ params }: { params: { id: string } }) {
	const challenge = await getChallenge(params.id)

	return (
		<main>
			<div className='my-20'>
				<ProjectFormUpdate {...challenge} />
			</div>
		</main>
	)
}
