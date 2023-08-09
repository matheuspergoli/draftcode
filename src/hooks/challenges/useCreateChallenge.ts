import React from 'react'

const BACKEND_UPLOAD_URL = process.env.NEXT_PUBLIC_BACKEND_UPLOAD_URL

interface Props {
	image: FileList
}

export const useCreateChallenge = <T extends Props>() => {
	const [loading, setLoading] = React.useState(false)

	const createChallenge = async (data: T) => {
		const formData = new FormData()

		formData.append('image', data.image[0])

		try {
			setLoading(true)
			const responseImage = await fetch(`${BACKEND_UPLOAD_URL}/image-upload`, {
				method: 'POST',
				body: formData
			})
			const imageJson = (await responseImage.json()) as { url: string; public_id: string }

			const newProject = {
				...data,
				image: imageJson.url,
				image_id: imageJson.public_id
			}

			const responseProject = await fetch('/api/project', {
				method: 'POST',
				body: JSON.stringify(newProject)
			})

			await responseProject.json()

			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}

	return { createChallenge, loading }
}
