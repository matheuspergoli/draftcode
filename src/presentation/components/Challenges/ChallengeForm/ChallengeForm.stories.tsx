import { faker } from '@faker-js/faker'
import { ChallengeForm } from './ChallengeForm'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ChallengeForm> = {
	title: 'Challenges/ChallengeForm',
	component: ChallengeForm
}

export default meta
type Story = StoryObj<typeof ChallengeForm>

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
	render: () => <ChallengeForm challenges={challenges} />
}
