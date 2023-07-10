import path from 'path'
import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-styling',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions'
	],
	framework: {
		name: '@storybook/nextjs',
		options: {}
	},
	docs: {
		autodocs: 'tag'
	},
	staticDirs: ['../public'],
	webpackFinal: async (config) => {
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
				'@': path.resolve(__dirname, '../src'),
				'@mocks': path.resolve(__dirname, '../src/mocks'),
				'@context': path.resolve(__dirname, '../src/context'),
				'@configs': path.resolve(__dirname, '../src/configs'),
				'@provider': path.resolve(__dirname, '../src/provider'),
				'@components': path.resolve(__dirname, '../src/presentation/components'),
				'@externals': path.resolve(__dirname, '../src/externals')
			}
		}
		return config
	}
}
export default config
