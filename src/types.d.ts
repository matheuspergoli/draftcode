interface User {
	id: string
	role: string
	name: string
	email: string
	image: string
	isBanned: boolean
	favorites: Favorite[]
	challenges: Challenge[]
	social_media: Social_Media[]
}

interface Challenge {
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
	user: {
		id: string
		name: string
		image: string
		email: string
		social_media: Social_Media[]
	}
	favorites: Favorite[]
}

interface Favorite {
	id: string
	user_id: string
	project_id: string
}

interface Social_Media {
	id: string
	url: string
	type: string
}

interface Includes {
	user?: 'include' | undefined
	difficulty?: 'include' | undefined
	technologies?: 'include' | undefined
}

interface Resource {
	id: string
	link: string
	title: string
	description: string
	technologies: {
		title: string
	}[]
	image: {
		url: string
	}
}

interface Solution {
	id: string
	image: string
	website: string
	image_id: string
	approved: boolean
	repository: string
	user: {
		id: string
		name: string
		image: string
		email: string
		social_media: Social_Media[]
	}
}

interface BlogPostPreview {
	id: string
	slug: string
	title: string
	excerpt: string
	coverImage: {
		url: string
	}
}

interface BlogPost {
	id: string
	title: string
	content: {
		value: unknown
		blocks: unknown
	}
	coverImage: {
		url: string
	}
}

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware
