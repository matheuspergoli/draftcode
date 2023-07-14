import { z } from 'zod'
import { db } from '@/configs/db'
import { authOptions } from '@/configs/auth'
import { getServerSession } from 'next-auth/next'
import { NextResponse, NextRequest } from 'next/server'

const UserUpdate = z.object({
	role: z.enum(['USER', 'ADMIN', 'SUPERADMIN'])
})

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { user } = session

		const isSuperAdmin = user.role === 'SUPERADMIN'

		if (!isSuperAdmin) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { id } = params

		const body = await request.json()

		const { role } = UserUpdate.parse(body)

		const userUpdated = await db.user.update({
			where: { id: String(id) },
			data: { role }
		})

		return NextResponse.json(userUpdated)
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}
