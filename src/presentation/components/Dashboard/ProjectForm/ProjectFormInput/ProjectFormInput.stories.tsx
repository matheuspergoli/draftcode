import { Meta, StoryObj } from '@storybook/react'
import { ProjectFormInput } from './ProjectFormInput'

const meta: Meta<typeof ProjectFormInput> = {
	title: 'Dashboard/ProjectForm/ProjectFormInput',
	component: ProjectFormInput
}

export default meta
type Story = StoryObj<typeof ProjectFormInput>

export const Primary: Story = {
	render: () => (
		<ProjectFormInput
			htmlFor='nome-desafio'
			type='text'
			label='Nome do Desafio'
			placeholder='Nome do Desafio'
			helperText='Escolha um nome para o desafio entre 6 e 45 caracteres'
		/>
	)
}
