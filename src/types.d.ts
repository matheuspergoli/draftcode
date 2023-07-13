interface User {
	id: string
	role: string
	name: string
	email: string
	image: string
	projects: Project[]
	social_media: Social_Media[]
}

interface Project {
	id: string
	title: string
	image: string
	brief: string
	user_id: string
	image_id: string
	figma_url: string
	description: string
	difficulty_id: string
	difficulty: {
		id: string
		name: string
	}
	technologies: {
		id: string
		name: string
	}[]
	User: {
		id: string
		name: string
		image: string
		email: string
		social_media: Social_Media[]
	}
}

interface Social_Media {
	id: string
	url: string
	type: string
}
