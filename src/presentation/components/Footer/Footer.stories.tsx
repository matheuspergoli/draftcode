import { Footer } from './Footer'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Footer> = {
	title: 'Footer',
	component: Footer
}

export default meta
type Story = StoryObj<typeof Footer>

export const Primary: Story = {
	render: () => <Footer />
}
