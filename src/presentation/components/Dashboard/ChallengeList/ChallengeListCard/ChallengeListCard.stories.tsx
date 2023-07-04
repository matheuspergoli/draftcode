import { Meta, StoryObj } from '@storybook/react'
import { ChallengeListCard } from './ChallengeListCard'

const meta: Meta<typeof ChallengeListCard> = {
	title: 'Dashboard/ChallengeList/ChallengeListCard',
	component: ChallengeListCard
}

export default meta
type Story = StoryObj<typeof ChallengeListCard>

export const Primary: Story = {
	render: () => (
		<ChallengeListCard
			id='1'
			image='https://source.unsplash.com/random/?Animal'
			title='Challenge Title'
		/>
	)
}
