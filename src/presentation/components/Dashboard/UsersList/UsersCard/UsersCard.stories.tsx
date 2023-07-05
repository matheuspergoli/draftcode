import { rest } from 'msw'
import { UsersCard } from './UsersCard'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof UsersCard> = {
	title: 'Dashboard/UsersList/UsersCard',
	component: UsersCard,
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
type Story = StoryObj<typeof UsersCard>

export const Primary: Story = {
	render: () => (
		<UsersCard id='1' name='Matheus Pergoli' image='https://github.com/shadcn.png' />
	)
}
