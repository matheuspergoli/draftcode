import { faker } from '@faker-js/faker'
import { Challenges } from './Challenges'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Challenges> = {
	title: 'Challenges',
	component: Challenges
}

export default meta
type Story = StoryObj<typeof Challenges>

const createMockProject = (): Project => {
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
		]
	}
}

const challenges: Project[] = faker.helpers.multiple(createMockProject, {
	count: 10
})

export const Primary: Story = {
	render: () => <Challenges challenges={challenges} />
}
