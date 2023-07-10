import { rest } from 'msw'
import { Meta, StoryObj } from '@storybook/react'
import ProjectFormUpdate from './ProjectFormUpdate'
import { createMockProject } from '@mocks/MockProject'

const meta: Meta<typeof ProjectFormUpdate> = {
	title: 'Dashboard/ProjectForm/ProjectFormUpdate',
	component: ProjectFormUpdate,
	parameters: {
		msw: {
			handlers: [
				rest.post('/api/project/:id', (_, res, ctx) => {
					return res(ctx.status(200), ctx.json({}))
				})
			]
		}
	}
}

export default meta
type Story = StoryObj<typeof ProjectFormUpdate>

export const Primary: Story = {
	render: () => <ProjectFormUpdate {...createMockProject()} />
}
