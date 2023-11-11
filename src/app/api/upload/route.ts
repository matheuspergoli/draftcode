import { authOptions } from '@/configs/auth'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { uploadToCloudinary, deleteFromCloudinary } from '@configs/cloudinary'

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { user } = session

		if (user.isBanned) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const body = await request.formData()

		const image = await uploadToCloudinary(body.get('image') as File)

		return NextResponse.json({ url: image.url, public_id: image.public_id })
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { user } = session

		if (user.isBanned) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const body = (await request.json()) as { public_id: string }

		await deleteFromCloudinary(body.public_id)

		return NextResponse.json({ message: `Image with id: ${body.public_id} deleted` })
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}
