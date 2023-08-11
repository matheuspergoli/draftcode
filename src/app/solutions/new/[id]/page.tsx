import { db } from '@configs/db'
import { redirect } from 'next/navigation'
import { SolutionFormCreate } from '@components/Solution'

export default async function NewSolution({ params }: { params: { id: string } }) {
	const project = await db.project.findUnique({
		where: {
			id: params.id
		}
	})

	if (!project) {
		redirect('/desafios')
	}

	return (
		<main className='mb-14 mt-10'>
			<article className='container mb-10 text-3xl font-semibold'>
				<h1 className='mb-3'>Envie sua solução para o desafio:</h1>
				<p className='magic-text'>{project.title}</p>
				<p className='mt-2 text-sm'>
					Após o envio da sua solução ela ficará pendente até ser aprovada por um
					administrador, caso não veja ela imediatamente no site não se preocupe.
				</p>
			</article>
			<SolutionFormCreate challengeId={params.id} />
		</main>
	)
}
