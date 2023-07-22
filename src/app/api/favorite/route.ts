import { z } from 'zod'
import { db } from '@/configs/db'
import { NextResponse } from 'next/server'
import { authOptions } from '@/configs/auth'
import { redis } from '@externals/libs/redis'
import { getServerSession } from 'next-auth/next'
import { ProjectSchemaFavorite } from '@/validations'

export async function POST(request: Request) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { user } = session

		const body = await request.json()

		const { projectId } = ProjectSchemaFavorite.parse(body)

		const existingFavorite = await db.favorite.findUnique({
			where: {
				user_id_project_id: {
					user_id: user.id,
					project_id: projectId
				}
			}
		})

		if (existingFavorite) {
			return NextResponse.json({ error: 'Projeto já favoritado' }, { status: 400 })
		}

		const newFavorite = await db.favorite.create({
			data: {
				user: { connect: { id: user.id } },
				project: { connect: { id: projectId } }
			}
		})

		await redis.del('challenges')
		await redis.del(`challenge:${projectId}`)

		return NextResponse.json(newFavorite)
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.issues }, { status: 400 })
		}

		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}

export async function DELETE(request: Request) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { user } = session

		const body = await request.json()

		const { projectId } = ProjectSchemaFavorite.parse(body)

		const existingFavorite = await db.favorite.findUnique({
			where: {
				user_id_project_id: {
					user_id: user.id,
					project_id: projectId
				}
			}
		})

		if (!existingFavorite) {
			return NextResponse.json({ error: 'Projeto não está favoritado' }, { status: 400 })
		}

		await db.favorite.delete({
			where: { id: existingFavorite.id }
		})

		await redis.del('challenges')
		await redis.del(`challenge:${projectId}`)

		return NextResponse.json({ message: 'Favorito removido com sucesso' })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.issues }, { status: 400 })
		}

		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}
