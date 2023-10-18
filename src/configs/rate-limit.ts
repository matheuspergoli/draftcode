import { LRUCache } from 'lru-cache'

interface Options {
	uniqueTokenPerInterval?: number // max number of unique tokens in the time period
	interval?: number // interval in milliseconds
	limit: number // max number of requests within interval
}

export const rateLimit = (options?: Options) => {
	const tokenCache = new LRUCache({
		max: options?.uniqueTokenPerInterval || 50, // max number of tokens to be stored in LRU Cache
		ttl: options?.interval || 60 * 1000 // 1 minute
	})

	return {
		check: (token: string, limit = options?.limit || 100) => {
			const tokenCount = (tokenCache.get(token) as number[]) || [0]
			if (tokenCount[0] === 0) {
				tokenCache.set(token, tokenCount)
			}
			tokenCount[0] += 1

			const currentUsage = tokenCount[0] ?? 0 // provide a default value of 0 if currentUsage is undefined
			const isRateLimited = currentUsage >= limit

			return {
				isRateLimited,
				currentUsage: currentUsage || 0, // provide a default value of 0 if currentUsage is undefined
				limit
			}
		}
	}
}
