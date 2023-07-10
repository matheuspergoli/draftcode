import { rest } from 'msw'
import { faker } from '@faker-js/faker'
import ChallengeList from './ChallengeList'
import { Meta, StoryObj } from '@storybook/react'
import { createMockProject } from '@mocks/MockProject'

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

const challenges: Project[] = faker.helpers.multiple(createMockProject, {
	count: 10
})

export const Primary: Story = {
	render: () => <ChallengeList challenges={challenges} />
}
