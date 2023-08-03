import { z } from 'zod'
import { db } from '@/configs/db'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { authOptions } from '@/configs/auth'
import { SolutionSchemaAPI } from '@/validations'
import { getServerSession } from 'next-auth/next'

export async function POST(request: Request, { params }: { params: { id: string } }) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { user } = session

		if (user.isBanned) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		if (!params.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const projectExists = await db.project.findUnique({
			where: { id: params.id }
		})

		if (!projectExists) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const body = await request.json()

		const solution = SolutionSchemaAPI.parse(body)

		const newSolution = await db.solution.create({
			data: {
				user: {
					connect: { id: user.id }
				},
				project: {
					connect: { id: params.id }
				},
				image: solution.image,
				image_id: solution.image_id,
				website: solution.website,
				repository: solution.repository
			}
		})

		return NextResponse.json(newSolution, { status: 201 })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.issues }, { status: 400 })
		}

		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		if (session.user.isBanned) {
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
		const solution = SolutionSchemaAPI.parse(body)

		const updateData = {} as Prisma.SolutionUpdateInput

		const fieldsToCheck = ['image', 'image_id', 'website', 'repository'] as const

		for (const field of fieldsToCheck) {
			if (solution[field] !== undefined) {
				updateData[field] = solution[field]
			}
		}

		const updatedSolution = await db.solution.update({
			where: { id: params.id },
			data: {
				...updateData,
				approved: false
			}
		})

		return NextResponse.json(updatedSolution, { status: 200 })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.issues }, { status: 400 })
		}

		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		if (session.user.isBanned) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		if (!params.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const solutionExists = await db.solution.findUnique({
			where: { id: params.id }
		})

		if (!solutionExists) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const solution = await db.solution.delete({
			where: { id: params.id }
		})

		return NextResponse.json(solution, { status: 201 })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.issues }, { status: 400 })
		}

		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}
