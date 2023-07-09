import { rest } from 'msw'
import { faker } from '@faker-js/faker'
import { Meta, StoryObj } from '@storybook/react'
import ProjectFormUpdate from './ProjectFormUpdate'

const meta: Meta<typeof ProjectFormUpdate> = {
	title: 'Dashboard/ProjectForm/ProjectFormUpdate',
	component: ProjectFormUpdate,
	parameters: {
		msw: {
			handlers: [
				rest.post('/api/project/:id', (_, res, ctx) => {
					return res(ctx.status(200), ctx.json({}))
				})
			]
		}
	}
}

const createMockProject = (): Project => {
	return {
		id: faker.string.uuid(),
		user_id: faker.string.uuid(),
		brief: 'Brief',
		image: 'https://github.com/shadcn.png',
		title: `Challenge ${faker.number.int(50)}`,
		figma_url: 'Figma URL',
		description: 'Description',
		difficulty: {
			id: faker.string.uuid(),
			name: 'Iniciante'
		},
		difficulty_id: faker.string.uuid(),
		technologies: [
			{
				id: faker.string.uuid(),
				name: 'React'
			},
			{
				id: faker.string.uuid(),
				name: 'Next.js'
			},
			{
				id: faker.string.uuid(),
				name: 'TypeScript'
			}
		]
	}
}

export default meta
type Story = StoryObj<typeof ProjectFormUpdate>

export const Primary: Story = {
	render: () => <ProjectFormUpdate {...createMockProject()} />
}
