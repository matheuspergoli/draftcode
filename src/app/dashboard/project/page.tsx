import dynamic from 'next/dynamic'

const ProjectForm = dynamic(
	() => import('@components/Dashboard/ProjectForm/ProjectFormCreate/ProjectFormCreate')
)

export default function Project() {
	return (
		<main>
			<div className='my-20'>
				<ProjectForm />
			</div>
		</main>
	)
}
