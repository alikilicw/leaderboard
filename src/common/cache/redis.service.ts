import { Injectable } from '@nestjs/common'
import { InjectRedis } from '@nestjs-modules/ioredis'
import { Redis } from 'ioredis'

@Injectable()
export class RedisService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async hset(hash: string, field: string, value: string | number): Promise<number> {
        return await this.redis.hset(hash, field, value)
    }

    async hget(hash: string, field: string): Promise<string | null> {
        return await this.redis.hget(hash, field)
    }

    async zadd(set: string, score: number, member: string): Promise<number> {
        return await this.redis.zadd(set, score, member)
    }

    async zrange(set: string, start: number, stop: number, withScores = false): Promise<string[]> {
        return withScores ? await this.redis.zrange(set, start, stop, 'WITHSCORES') : await this.redis.zrange(set, start, stop)
    }

    async zrevrange(set: string, start: number, stop: number, withScores = false): Promise<string[]> {
        return withScores
            ? await this.redis.zrevrange(set, start, stop, 'WITHSCORES')
            : await this.redis.zrevrange(set, start, stop)
    }

    async zrevrank(set: string, member: string): Promise<number | null> {
        const rank = await this.redis.zrevrank(set, member)
        return rank ?? -1
    }

    async zscore(set: string, member: string): Promise<number | null> {
        const score = await this.redis.zscore(set, member)
        return score ? Number(score) : null
    }

    async zcard(key: string): Promise<number> {
        return await this.redis.zcard(key)
    }
}
