import { FAQ } from './FAQ'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof FAQ> = {
	title: 'FAQ',
	component: FAQ
}

export default meta
type Story = StoryObj<typeof FAQ>

export const Primary: Story = {
	render: () => <FAQ />
}
