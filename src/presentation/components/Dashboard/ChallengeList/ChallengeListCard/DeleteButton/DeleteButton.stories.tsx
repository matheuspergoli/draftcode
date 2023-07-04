import { Meta, StoryObj } from '@storybook/react'
import { DeleteButton } from './DeleteButton'

const meta: Meta<typeof DeleteButton> = {
	title: 'Dashboard/ChallengeList/ChallengeListCard/DeleteButton',
	component: DeleteButton
}

export default meta
type Story = StoryObj<typeof DeleteButton>

export const Primary: Story = {
	render: () => <DeleteButton id='1' />
}
