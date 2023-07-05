import { rest } from 'msw'
import { UpdateButton } from './UpdateButton'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof UpdateButton> = {
	title: 'Dashboard/UsersList/UsersCard/UpdateButton',
	component: UpdateButton,
	parameters: {
		msw: {
			handlers: [
				rest.put('/api/users/:id', (_, res, ctx) => {
					return res(ctx.status(200), ctx.json({}))
				})
			]
		}
	}
}

export default meta
type Story = StoryObj<typeof UpdateButton>

export const Primary: Story = {
	render: () => <UpdateButton id='1' />
}
