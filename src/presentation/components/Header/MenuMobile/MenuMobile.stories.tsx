import { MenuMobile } from './MenuMobile'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MenuMobile> = {
	title: 'Header/MenuMobile',
	component: MenuMobile,
	parameters: {
		viewport: {
			defaultViewport: 'sm'
		}
	}
}

export default meta
type Story = StoryObj<typeof MenuMobile>

export const Primary: Story = {
	render: () => <MenuMobile />
}
