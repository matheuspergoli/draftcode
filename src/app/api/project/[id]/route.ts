import { z } from 'zod'
import { db } from '@/configs/db'
import { Prisma } from '@prisma/client'
import { revalidateTag } from 'next/cache'
import { authOptions } from '@/configs/auth'
import { getServerSession } from 'next-auth/next'
import { NextResponse, NextRequest } from 'next/server'

const Project = z.object({
	title: z.string().optional(),
	image: z.string().optional(),
	brief: z.string().optional(),
	figma_url: z.string().optional(),
	difficulty: z.string().optional(),
	description: z.string().optional(),
	technologies: z.array(z.string()).optional()
})

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

		const project = Project.parse(body)

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

		const tag = request.nextUrl.searchParams.get('tag')

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

		revalidateTag(tag as string)

		return NextResponse.json(project)
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}
