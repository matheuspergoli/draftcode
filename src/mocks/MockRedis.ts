import { Redis } from 'ioredis'

export const MockRedis = () => {
	return {
		get: () => {
			return null
		},

		set: () => {
			return new Promise<void>((resolve) => {
				resolve()
			})
		},

		del: () => {
			return null
		}
	} as unknown as Redis
}
