import dynamic from 'next/dynamic'

const ProjectFormCreate = dynamic(
	() => import('@components/Dashboard/ProjectForm/ProjectFormCreate')
)

export default function Project() {
	return (
		<main>
			<div className='my-20'>
				<ProjectFormCreate />
			</div>
		</main>
	)
}
