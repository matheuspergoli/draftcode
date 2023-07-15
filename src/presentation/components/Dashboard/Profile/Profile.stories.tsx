import { rest } from 'msw'
import { Profile } from './Profile'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Profile> = {
	title: 'Dashboard/Profile',
	component: Profile,
	parameters: {
		msw: {
			handlers: [
				rest.post(`/api/profile`, (_, res, ctx) => {
					return res(ctx.status(200), ctx.json({}))
				})
			]
		}
	}
}

export default meta
type Story = StoryObj<typeof Profile>

export const Primary: Story = {
	render: () => <Profile user={null} />
}
