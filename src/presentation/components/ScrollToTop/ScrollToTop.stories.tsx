import { ScrollToTop } from './ScrollToTop'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ScrollToTop> = {
	title: 'ScrollToTop',
	component: ScrollToTop
}

export default meta
type Story = StoryObj<typeof ScrollToTop>

export const Primary: Story = {
	render: () => <ScrollToTop />
}
