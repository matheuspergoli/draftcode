import { Header } from './Header'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Header> = {
	title: 'Header',
	component: Header
}

export default meta
type Story = StoryObj<typeof Header>

export const Primary: Story = {
	render: () => <Header />
}
