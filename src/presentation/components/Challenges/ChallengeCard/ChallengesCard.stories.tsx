import { Meta, StoryObj } from '@storybook/react'
import { ChallengesCard } from './ChallengesCard'

const meta: Meta<typeof ChallengesCard> = {
	title: 'Challenges/ChallengesCard',
	component: ChallengesCard,
	parameters: {
		viewport: {
			defaultViewport: 'sm'
		}
	}
}

export default meta
type Story = StoryObj<typeof ChallengesCard>

export const Primary: Story = {
	render: () => (
		<ChallengesCard
			id='1'
			difficulty='Iniciante'
			title='Challenge Title'
			image='https://source.unsplash.com/random/?Animal'
			brief='Lorem ipsum dolor sit amet consectetur. Sit lorem in mi mattis lobortis elementum. At orci tristique velit tristique sodales quisque. Odio integer odio sem suspendisse ultricies sit ultricies eu mauris.'
			technologies={['React', 'Next.js', 'TypeScript']}
		/>
	)
}
