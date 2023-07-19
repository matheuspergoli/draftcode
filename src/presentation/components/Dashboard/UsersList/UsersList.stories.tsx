import { rest } from 'msw'
import UsersList from './UsersList'
import { faker } from '@faker-js/faker'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof UsersList> = {
	title: 'Dashboard/UsersList',
	component: UsersList,
	parameters: {
		msw: {
			handlers: [
				rest.put(`/api/users/:id`, (_, res, ctx) => {
					return res(ctx.status(200), ctx.json({}))
				})
			]
		}
	}
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
		social_media: [],
		favorites: []
	}
}

const users: User[] = faker.helpers.multiple(createMockUsers, {
	count: 10
})

export const Primary: Story = {
	render: () => <UsersList users={users} />
}
