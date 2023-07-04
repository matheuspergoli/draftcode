import { z } from 'zod'
import { db } from '@/configs/db'
import { NextResponse } from 'next/server'
import { authOptions } from '@/configs/auth'
import { getServerSession } from 'next-auth/next'

const Project = z.object({
	title: z.string().nonempty(),
	image: z.string().nonempty(),
	brief: z.string().nonempty(),
	figma_url: z.string().nonempty(),
	difficulty: z.string().nonempty(),
	description: z.string().nonempty(),
	technologies: z.array(z.string()).min(1).nonempty()
})

export async function GET() {
	try {
		const projects = await db.project.findMany({
			include: {
				difficulty: true,
				technologies: true
			}
		})

		return NextResponse.json(projects)
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}

export async function POST(request: Request) {
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

		const body = await request.json()

		const project = Project.parse(body)

		const newProject = await db.project.create({
			data: {
				User: {
					connect: { id: user.id }
				},
				title: project.title,
				image: project.image,
				brief: project.brief,
				figma_url: project.figma_url,
				description: project.description,
				difficulty: {
					connectOrCreate: {
						create: { name: project.difficulty },
						where: { name: project.difficulty }
					}
				},
				technologies: {
					connectOrCreate: project.technologies.map((technology) => ({
						create: { name: technology },
						where: { name: technology }
					}))
				}
			}
		})

		return NextResponse.json(newProject)
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.issues }, { status: 400 })
		}

		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}
