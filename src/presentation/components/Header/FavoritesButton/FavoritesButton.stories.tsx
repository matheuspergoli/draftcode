import { StoryObj, Meta } from '@storybook/react'
import { FavoritesButton } from './FavoritesButton'

const meta: Meta<typeof FavoritesButton> = {
	title: 'Header/FavoritesButton',
	component: FavoritesButton
}

export default meta
type Story = StoryObj<typeof FavoritesButton>

export const Default: Story = {
	render: () => <FavoritesButton />
}
