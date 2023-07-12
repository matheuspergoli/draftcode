import { z } from 'zod'
import { db } from '@/configs/db'
import { authOptions } from '@/configs/auth'
import { getServerSession } from 'next-auth/next'
import { ProfileSchemaLinks } from '@/validations'
import { NextRequest, NextResponse } from 'next/server'

type ProfileLinks = {
	type: 'GITHUB' | 'WEBSITE' | 'LINKEDIN'
	url: string
}

export async function POST(request: NextRequest) {
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

		const profileLinks = ProfileSchemaLinks.parse(body)

		const links: ProfileLinks[] = [
			{
				type: 'GITHUB',
				url: profileLinks.github
			},
			{
				type: 'WEBSITE',
				url: profileLinks.website
			},
			{
				type: 'LINKEDIN',
				url: profileLinks.linkedin
			}
		]

		const updatedProfile = await db.user.update({
			where: { id: user.id },
			data: {
				social_media: {
					connectOrCreate: links.map((link) => ({
						create: { type: link.type, url: link.url },
						where: { type: link.type }
					}))
				}
			},
			include: {
				social_media: true
			}
		})

		return NextResponse.json(updatedProfile)
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.issues }, { status: 400 })
		}

		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}
