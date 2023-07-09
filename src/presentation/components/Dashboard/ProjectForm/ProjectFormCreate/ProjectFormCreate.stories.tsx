import { rest } from 'msw'
import { Meta, StoryObj } from '@storybook/react'
import ProjectFormCreate from './ProjectFormCreate'

const meta: Meta<typeof ProjectFormCreate> = {
	title: 'Dashboard/ProjectFormCreate',
	component: ProjectFormCreate,
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
type Story = StoryObj<typeof ProjectFormCreate>

export const Primary: Story = {
	render: () => <ProjectFormCreate />
}
