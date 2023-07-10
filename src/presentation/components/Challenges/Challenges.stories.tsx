import { faker } from '@faker-js/faker'
import { Challenges } from './Challenges'
import { Meta, StoryObj } from '@storybook/react'
import { createMockProject } from '@mocks/MockProject'

const meta: Meta<typeof Challenges> = {
	title: 'Challenges',
	component: Challenges
}

export default meta
type Story = StoryObj<typeof Challenges>

const challenges: Project[] = faker.helpers.multiple(createMockProject, {
	count: 10
})

export const Primary: Story = {
	render: () => <Challenges challenges={challenges} />
}
