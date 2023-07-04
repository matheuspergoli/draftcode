import { Hero } from './Hero'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Hero> = {
	title: 'Hero',
	component: Hero
}

export default meta
type Story = StoryObj<typeof Hero>

export const Primary: Story = {
	render: () => <Hero />
}
