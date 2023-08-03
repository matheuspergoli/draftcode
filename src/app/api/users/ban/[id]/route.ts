import { z } from 'zod'
import { db } from '@/configs/db'
import { authOptions } from '@/configs/auth'
import { getServerSession } from 'next-auth/next'
import { NextResponse, NextRequest } from 'next/server'

const UserUpdate = z.object({
	banned: z.enum(['Banir', 'Desbanir'])
})

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { user } = session

		const isAdmin = user.role === 'SUPERADMIN' || user.role === 'ADMIN'

		if (!isAdmin) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { id } = params

		const body = await request.json()

		const { banned } = UserUpdate.parse(body)

		const isBanned = banned === 'Banir' ? true : false

		const userUpdated = await db.user.update({
			where: { id: String(id) },
			data: { isBanned }
		})

		return NextResponse.json(userUpdated)
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}
