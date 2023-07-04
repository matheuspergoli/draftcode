import { AboutCard } from './AboutCard'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof AboutCard> = {
	title: 'About/AboutCard',
	component: AboutCard,
	parameters: {
		viewport: {
			defaultViewport: 'sm'
		}
	}
}

export default meta
type Story = StoryObj<typeof AboutCard>

export const Primary: Story = {
	render: () => (
		<AboutCard
			title='Fale alguma coisa aqui'
			description='Lorem ipsum dolor sit amet consectetur. Sapien amet feugiat varius.'
			buttonText='Saiba mais'
		/>
	)
}
