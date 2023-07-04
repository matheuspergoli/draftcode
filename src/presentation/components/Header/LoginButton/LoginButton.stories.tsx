import { LoginButton } from './LoginButton'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LoginButton> = {
	title: 'Header/LoginButton',
	component: LoginButton
}

export default meta
type Story = StoryObj<typeof LoginButton>

export const Primary: Story = {
	render: () => <LoginButton />
}
