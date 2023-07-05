import { rest } from 'msw'
import ProjectForm from './ProjectForm'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ProjectForm> = {
	title: 'Dashboard/ProjectForm',
	component: ProjectForm,
	parameters: {
		msw: {
			handlers: [
				rest.post('/api/project', (_, res, ctx) => {
					return res(ctx.status(200), ctx.json({}))
				})
			]
		}
	}
}

export default meta
type Story = StoryObj<typeof ProjectForm>

export const Primary: Story = {
	render: () => <ProjectForm />
}
