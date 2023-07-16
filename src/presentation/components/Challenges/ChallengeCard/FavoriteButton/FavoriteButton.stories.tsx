import { rest } from 'msw'
import { Meta, StoryObj } from '@storybook/react'
import { FavoriteButton } from './FavoriteButton'

const meta: Meta<typeof FavoriteButton> = {
	title: 'Challenges/ChallengesCard/FavoriteButton',
	component: FavoriteButton,
	parameters: {
		msw: {
			handlers: [
				rest.post('/api/favorite', (_, res, ctx) => {
					return res(ctx.status(200), ctx.json({}))
				}),
				rest.delete('/api/favorite', (_, res, ctx) => {
					return res(ctx.status(200), ctx.json({}))
				})
			]
		}
	}
}

export default meta
type Story = StoryObj<typeof FavoriteButton>

export const Primary: Story = {
	render: () => <FavoriteButton projectId='1' />
}
