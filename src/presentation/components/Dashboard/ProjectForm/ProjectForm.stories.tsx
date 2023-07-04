import { ProjectForm } from './ProjectForm'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ProjectForm> = {
	title: 'Dashboard/ProjectForm',
	component: ProjectForm
}

export default meta
type Story = StoryObj<typeof ProjectForm>

export const Primary: Story = {
	render: () => <ProjectForm />
}
