import { UsersCard } from './UsersCard'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof UsersCard> = {
	title: 'Dashboard/UsersList/UsersCard',
	component: UsersCard
}

export default meta
type Story = StoryObj<typeof UsersCard>

export const Primary: Story = {
	render: () => (
		<UsersCard id='1' name='Matheus Pergoli' image='https://github.com/shadcn.png' />
	)
}
