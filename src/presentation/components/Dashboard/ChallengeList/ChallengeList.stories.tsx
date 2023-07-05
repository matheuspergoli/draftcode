import { rest } from 'msw'
import { faker } from '@faker-js/faker'
import ChallengeList from './ChallengeList'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ChallengeList> = {
	title: 'Dashboard/ChallengeList',
	component: ChallengeList,
	parameters: {
		msw: {
			handlers: [
				rest.delete(`/api/project/:id`, (_, res, ctx) => {
					return res(ctx.status(200), ctx.json({}))
				})
			]
		}
	}
}

export default meta
type Story = StoryObj<typeof ChallengeList>

const createMockProject = (): Project => {
	return {
		id: faker.string.uuid(),
		user_id: faker.string.uuid(),
		brief: 'Brief',
		image: 'https://github.com/shadcn.png',
		title: `Challenge ${faker.number.int(50)}`,
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
	render: () => <ChallengeList challenges={challenges} />
}
