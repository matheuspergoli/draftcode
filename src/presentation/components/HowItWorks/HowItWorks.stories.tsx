import { HowItWorks } from './HowItWorks'
import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof HowItWorks> = {
	title: 'HowItWorks',
	component: HowItWorks
}

export default meta
type Story = StoryObj<typeof HowItWorks>

export const Primary: Story = {
	render: () => <HowItWorks />
}
