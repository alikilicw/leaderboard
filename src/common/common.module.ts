import { Module } from '@nestjs/common'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { RedisModule as IoRedisModule } from '@nestjs-modules/ioredis'
import { Constants } from './constants.config'
import { RedisService } from './cache/redis.service'

@Module({
    imports: [
        IoRedisModule.forRoot({
            type: 'single',
            url: `redis://${Constants.REDIS_HOST}:${Constants.REDIS_PORT}`
        })
    ],
    providers: [JwtAuthGuard, RedisService],
    exports: [JwtAuthGuard, RedisService]
})
export class CommonModule {}
