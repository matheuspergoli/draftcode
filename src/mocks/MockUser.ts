import { faker } from '@faker-js/faker'

export const createMockUser = (): User => {
	return {
		id: faker.string.uuid(),
		name: faker.internet.displayName(),
		email: faker.internet.email(),
		image: faker.internet.avatar(),
		social_media: [],
		projects: [],
		role: 'USER',
		favorites: []
	}
}
