import { UserAvatar } from './UserAvatar'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof UserAvatar> = {
	title: 'Header/UserAvatar',
	component: UserAvatar,
	parameters: {
		viewport: {
			defaultViewport: 'sm'
		}
	}
}

export default meta
type Story = StoryObj<typeof UserAvatar>

export const Primary: Story = {
	render: () => <UserAvatar image='https://github.com/shadcn.png' />
}
