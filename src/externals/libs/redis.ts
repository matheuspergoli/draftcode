import { Redis } from 'ioredis'

const isDEV = process.env.NODE_ENV === 'development'

const MockRedis = () => {
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

export const redis = isDEV ? MockRedis() : new Redis(process.env.REDIS_URL as string)
