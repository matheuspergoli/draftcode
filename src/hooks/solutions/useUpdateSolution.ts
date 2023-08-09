/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

const BACKEND_UPLOAD_URL = process.env.NEXT_PUBLIC_BACKEND_UPLOAD_URL

interface Props {
	image?: any
}

export const useUpdateSolution = <T extends Props>(oldSolution: Solution) => {
	const [loading, setLoading] = React.useState(false)

	const updateSolution = async (data: T) => {
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

			const newSolution = {
				...data,
				image: imageJson?.url ?? oldSolution.image,
				image_id: imageJson?.public_id ?? oldSolution.image_id
			}

			if (newSolution.image_id !== oldSolution.image_id) {
				await fetch(`${BACKEND_UPLOAD_URL}/image-upload/delete`, {
					method: 'DELETE',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ public_id: oldSolution.image_id })
				})
			}

			const response = await fetch(`/api/solutions/${oldSolution.id}`, {
				method: 'PUT',
				body: JSON.stringify(newSolution)
			})

			await response.json()
		} catch (error) {
			setLoading(false)
		}
	}

	return { updateSolution, loading }
}
