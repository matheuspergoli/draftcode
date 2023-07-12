import { Profile } from './Profile'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Profile> = {
	title: 'Dashboard/Profile',
	component: Profile
}

export default meta
type Story = StoryObj<typeof Profile>

export const Primary: Story = {
	render: () => <Profile />
}
