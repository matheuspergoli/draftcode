import { CreatorCard } from './CreatorCard'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CreatorCard> = {
	title: 'CreatorCard',
	component: CreatorCard
}

export default meta
type Story = StoryObj<typeof CreatorCard>

export const Primary: Story = {
	render: () => (
		<CreatorCard
			image='https://github.com/shadcn.png'
			name='Matheus Pergoli'
			github='https://github.com/matheuspergoli?tab=overview&from=2023-06-01&to=2023-06-30'
			website='https://matheuspergoli-portfolio.vercel.app/'
			linkedin='https://www.linkedin.com/in/matheuspergoli/'
		/>
	)
}
