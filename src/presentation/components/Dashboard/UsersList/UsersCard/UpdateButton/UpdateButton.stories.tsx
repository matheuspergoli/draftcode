import { UpdateButton } from './UpdateButton'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof UpdateButton> = {
	title: 'Dashboard/UsersList/UsersCard/UpdateButton',
	component: UpdateButton
}

export default meta
type Story = StoryObj<typeof UpdateButton>

export const Primary: Story = {
	render: () => <UpdateButton id='1' />
}
