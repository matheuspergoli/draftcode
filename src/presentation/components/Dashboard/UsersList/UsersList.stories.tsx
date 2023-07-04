import { faker } from '@faker-js/faker'
import { UsersList } from './UsersList'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof UsersList> = {
	title: 'Dashboard/UsersList',
	component: UsersList
}

export default meta
type Story = StoryObj<typeof UsersList>

const createMockUsers = (): User => {
	return {
		id: faker.string.uuid(),
		name: 'Matheus Pergoli',
		email: 'matheuspergoli@email.com',
		image: 'https://github.com/shadcn.png',
		role: 'SUPERADMIN',
		projects: [],
		social_media: []
	}
}

const users: User[] = faker.helpers.multiple(createMockUsers, {
	count: 10
})

export const Primary: Story = {
	render: () => <UsersList users={users} />
}
