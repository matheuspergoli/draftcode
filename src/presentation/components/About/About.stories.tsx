import { About } from './About'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof About> = {
	title: 'About',
	component: About
}

export default meta
type Story = StoryObj<typeof About>

export const Primary: Story = {
	render: () => <About />
}
