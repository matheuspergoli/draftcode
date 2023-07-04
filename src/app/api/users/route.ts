import { db } from '@/configs/db'
import { NextResponse } from 'next/server'
import { authOptions } from '@/configs/auth'
import { getServerSession } from 'next-auth/next'

export async function GET() {
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

		const users = await db.user.findMany()

		return NextResponse.json(users)
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}
