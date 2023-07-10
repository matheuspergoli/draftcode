import { z } from 'zod'
import { db } from '@/configs/db'
import { Prisma } from '@prisma/client'
import { authOptions } from '@/configs/auth'
import { redis } from '@externals/libs/redis'
import { ProjectSchemaAPI } from '@/validations'
import { getServerSession } from 'next-auth/next'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const { id } = params

		const project = await db.project.findUnique({
			where: { id: String(id) },
			include: {
				difficulty: true,
				technologies: true
			}
		})

		return NextResponse.json(project)
	} catch (error) {
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

		const { user } = session

		const isUserCreator = user.role === 'ADMIN' || user.role === 'SUPERADMIN'

		if (!isUserCreator) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { id } = params

		const body = await request.json()

		const project = ProjectSchemaAPI.parse(body)

		const updateData = {} as Prisma.ProjectUpdateInput

		const fieldsToCheck = ['title', 'image', 'brief', 'figma_url', 'description'] as const

		for (const field of fieldsToCheck) {
			if (project[field] !== undefined) {
				updateData[field] = project[field]
			}
		}

		if (project.difficulty) {
			updateData.difficulty = {
				connectOrCreate: {
					create: { name: project.difficulty },
					where: { name: project.difficulty }
				}
			}
		}

		if (project.technologies && project.technologies.length > 0) {
			updateData.technologies = {
				connectOrCreate: project.technologies.map((technology) => ({
					create: { name: technology },
					where: { name: technology }
				}))
			}
		}

		const updatedProject = await db.project.update({
			where: { id: String(id) },
			data: updateData
		})

		await redis.del('challenges')
		await redis.del(`challenge:${id}`)

		return NextResponse.json(updatedProject)
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.issues }, { status: 400 })
		}

		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
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

		const { id } = params

		const project = await db.project.delete({
			where: { id: String(id) }
		})

		await redis.del('challenges')
		await redis.del(`challenge:${id}`)

		return NextResponse.json(project)
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}
