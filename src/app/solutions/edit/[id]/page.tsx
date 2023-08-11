import { redirect } from 'next/navigation'
import { getSolution } from '@actions/getSolution'
import { getUserSession } from '@actions/getUserSession'
import { SolutionFormUpdate } from '@components/Solution'

export default async function EditSolution({ params }: { params: { id: string } }) {
	const session = await getUserSession()

	const solution = await getSolution(params.id, {
		user: 'include'
	})

	if (solution.user.id !== session?.user.id) {
		if (session?.user.role !== 'SUPERADMIN') {
			redirect('/solutions')
		}
	}

	if (!solution.approved) {
		if (session?.user.role !== 'SUPERADMIN') {
			redirect('/solutions')
		}
	}

	return (
		<main>
			<article className='container mt-10 text-3xl font-semibold'>
				<h1 className='mb-3'>Atualize sua solução</h1>
				<p className='mt-2 text-sm'>
					Após a atualização da sua solução ela poderá ficar pendente até ser aprovada por
					um administrador, caso não veja ela imediatamente no site não se preocupe.
				</p>
			</article>
			<div className='mb-20 mt-10'>
				<SolutionFormUpdate solution={solution} />
			</div>
		</main>
	)
}
