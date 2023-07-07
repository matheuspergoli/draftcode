import { Meta, StoryObj } from '@storybook/react'
import { ProjectFormTextarea } from './ProjectFormTextarea'

const meta: Meta<typeof ProjectFormTextarea> = {
	title: 'Dashboard/ProjectForm/ProjectFormTextarea',
	component: ProjectFormTextarea
}

export default meta
type Story = StoryObj<typeof ProjectFormTextarea>

export const Primary: Story = {
	render: () => (
		<ProjectFormTextarea
			htmlFor='requisitos-desafio'
			label='Requisitos'
			placeholder='Você deve criar uma interface de usuário para um aplicativo de lista de tarefas simples. Ele deve consistir em um campo de entrada de texto, um botão "Adicionar" e uma lista de tarefas. Cada item da lista deve ter um botão "Excluir" que remova o item da lista. Você deve usar HTML, CSS e JavaScript para este projeto. Você não deve usar bibliotecas ou frameworks.'
			helperText='Informe para os usuarios as tasks que devem ser completadas'
		/>
	)
}
