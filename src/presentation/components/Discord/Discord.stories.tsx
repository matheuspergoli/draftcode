import { Discord } from './Discord'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Discord> = {
	title: 'Discord',
	component: Discord
}

export default meta
type Story = StoryObj<typeof Discord>

export const Primary: Story = {
	render: () => <Discord />
}
