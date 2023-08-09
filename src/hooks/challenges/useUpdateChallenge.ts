/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

const BACKEND_UPLOAD_URL = process.env.NEXT_PUBLIC_BACKEND_UPLOAD_URL

interface Props {
	image?: any
}

export const useUpdateChallenge = <T extends Props>(oldChallenge: Challenge) => {
	const [loading, setLoading] = React.useState(false)

	const updateChallenge = async (data: T) => {
		const formData = new FormData()

		if (data.image[0]) {
			formData.append('image', data.image[0])
		}

		try {
			setLoading(true)
			const responseImage = formData.get('image')
				? await fetch(`${BACKEND_UPLOAD_URL}/image-upload`, {
						method: 'POST',
						body: formData
				  })
				: null

			const imageJson = (await responseImage?.json()) as {
				url: string
				public_id: string
			}

			const newChallenge = {
				...data,
				image: imageJson?.url ?? oldChallenge.image,
				image_id: imageJson?.public_id ?? oldChallenge.image_id
			}

			if (newChallenge.image_id !== oldChallenge.image_id) {
				await fetch(`${BACKEND_UPLOAD_URL}/image-upload/delete`, {
					method: 'DELETE',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ public_id: oldChallenge.image_id })
				})
			}

			const responseProject = await fetch(`/api/project/${oldChallenge.id}`, {
				method: 'PUT',
				body: JSON.stringify(newChallenge)
			})

			await responseProject.json()

			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}

	return { updateChallenge, loading }
}
