import { Redis } from 'ioredis'
import { MockRedis } from '@mocks/MockRedis'

const isDEV = process.env.NODE_ENV === 'development'

export const redis = isDEV ? MockRedis() : new Redis(process.env.REDIS_URL as string)
