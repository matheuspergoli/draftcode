import { faker } from '@faker-js/faker'

export const createMockProject = (): Project => {
	return {
		id: faker.string.uuid(),
		user_id: faker.string.uuid(),
		brief: 'Brief',
		image: 'https://github.com/shadcn.png',
		title: `Challenge ${faker.number.int(10)}`,
		figma_url: 'Figma URL',
		description: 'Description',
		difficulty: {
			id: faker.string.uuid(),
			name: 'Iniciante'
		},
		difficulty_id: faker.string.uuid(),
		technologies: [
			{
				id: faker.string.uuid(),
				name: 'React'
			},
			{
				id: faker.string.uuid(),
				name: 'Next.js'
			},
			{
				id: faker.string.uuid(),
				name: 'TypeScript'
			}
		],
		User: {
			id: faker.string.uuid(),
			name: 'Shad',
			email: faker.internet.email(),
			image: faker.internet.avatar()
		}
	}
}
