import { rest } from 'msw'
import { DeleteButton } from './DeleteButton'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof DeleteButton> = {
	title: 'Dashboard/ChallengeList/ChallengeListCard/DeleteButton',
	component: DeleteButton,
	parameters: {
		msw: {
			handlers: [
				rest.delete('/api/project/:id', (_, res, ctx) => {
					return res(ctx.status(200), ctx.json({}))
				})
			]
		}
	}
}

export default meta
type Story = StoryObj<typeof DeleteButton>

export const Primary: Story = {
	render: () => <DeleteButton id='1' image_id='1' />
}
