import { GithubLoginBtn } from './GithubLoginBtn'
import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof GithubLoginBtn> = {
	title: 'GithubLoginBtn',
	component: GithubLoginBtn
}

export default meta
type Story = StoryObj<typeof GithubLoginBtn>

export const Primary: Story = {
	render: () => <GithubLoginBtn />
}
