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

		const existingSocialMedia = await db.social_Media.findMany({
			where: {
				user_id: user.id
			}
		})

		const updatePromises = links.map(async (link) => {
			const existingLink = existingSocialMedia.find((media) => media.type === link.type)

			if (existingLink) {
				await db.social_Media.update({
					where: { id: existingLink.id },
					data: { url: link.url }
				})
			} else {
				await db.social_Media.create({
					data: {
						type: link.type,
						url: link.url,
						User: { connect: { id: user.id } }
					}
				})
			}
		})

		await Promise.all(updatePromises)

		const updatedProfile = await db.user.findUnique({
			where: { id: user.id },
			include: { social_media: true }
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
