import { faker } from '@faker-js/faker'
import { ChallengeForm } from './ChallengeForm'
import { Meta, StoryObj } from '@storybook/react'
import { createMockProject } from '@mocks/MockProject'

const meta: Meta<typeof ChallengeForm> = {
	title: 'Challenges/ChallengeForm',
	component: ChallengeForm
}

export default meta
type Story = StoryObj<typeof ChallengeForm>

const challenges: Project[] = faker.helpers.multiple(createMockProject, {
	count: 10
})

export const Primary: Story = {
	render: () => <ChallengeForm challenges={challenges} />
}
