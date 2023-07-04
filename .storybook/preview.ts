import type { Preview } from '@storybook/react'

import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'

import 'swiper/css'
import '../src/styles/globals.css'

const customViewports = {
	xs: {
		name: 'Extra Small',
		styles: {
			width: '320px',
			height: '568px'
		}
	},

	sm: {
		name: 'Small',
		styles: {
			width: '375px',
			height: '667px'
		}
	},

	md: {
		name: 'Medium',
		styles: {
			width: '768px',
			height: '1024px'
		}
	}
}

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		},
		viewport: {
			viewports: {
				...MINIMAL_VIEWPORTS,
				...customViewports
			}
		},
		nextjs: {
			appDirectory: true
		}
	}
}

export default preview
