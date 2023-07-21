import { HowItWorksCard } from './'
import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof HowItWorksCard> = {
	title: 'HowItWorks/HowItWorksCard',
	component: HowItWorksCard
}

export default meta
type Story = StoryObj<typeof HowItWorksCard>

export const Primary: Story = {
	render: () => (
		<HowItWorksCard key='1' title='Título de teste' description='Descrição de Teste' />
	)
}
