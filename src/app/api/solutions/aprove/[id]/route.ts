import { z } from 'zod'
import { db } from '@/configs/db'
import { NextResponse } from 'next/server'
import { authOptions } from '@/configs/auth'
import { getServerSession } from 'next-auth/next'
import { SolutionAproveSchema } from '@/validations'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { user } = session

		const isUserCreator = user.role === 'ADMIN' || user.role === 'SUPERADMIN'

		if (!isUserCreator) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		if (!params.id) {
			return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
		}

		const solutionExists = await db.solution.findUnique({
			where: { id: params.id }
		})

		if (!solutionExists) {
			return NextResponse.json({ error: 'Solution not found' }, { status: 404 })
		}

		const body = await request.json()
		const solution = SolutionAproveSchema.parse(body)

		const approvedSolution = await db.solution.update({
			where: { id: params.id },
			data: {
				approved: solution.approved
			}
		})

		return NextResponse.json(approvedSolution, { status: 200 })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.issues }, { status: 400 })
		}

		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}
