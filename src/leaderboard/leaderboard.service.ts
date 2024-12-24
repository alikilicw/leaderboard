import { Injectable } from '@nestjs/common'
import { RedisService } from 'src/common/cache/redis.service'
import { GameService } from 'src/game/game.service'
import { GetLeaderboardDto, GetLeaderboardServiceOutputDto, LeaderboardOutput, SubmitScoreServiceDto } from './leaderboard.type'

@Injectable()
export class LeaderboardService {
    constructor(
        private readonly redisService: RedisService,
        private readonly gameService: GameService
    ) {}

    async submitScore(submitScoreServiceDto: SubmitScoreServiceDto) {
        const game = await this.gameService.findById(submitScoreServiceDto.gameId)

        const scoreHash = `player_scores:${game._id}`
        const leaderboardKey = `leaderboard:${game._id}`

        const currentScore = await this.redisService.hget(scoreHash, submitScoreServiceDto.playerId)

        if (!currentScore || submitScoreServiceDto.score > Number(currentScore)) {
            await this.redisService.hset(scoreHash, submitScoreServiceDto.playerId, submitScoreServiceDto.score)

            await this.redisService.zadd(leaderboardKey, submitScoreServiceDto.score, submitScoreServiceDto.playerId)
        }

        const rank = await this.getPlayerRank(submitScoreServiceDto.gameId, submitScoreServiceDto.playerId)
        return rank
    }

    async getLeaderBoard(gameId: string, getLeaderboardDto: GetLeaderboardDto): Promise<GetLeaderboardServiceOutputDto> {
        const leaderboardKey = `leaderboard:${gameId}`

        const start = getLeaderboardDto.page * getLeaderboardDto.limit
        const end = start + getLeaderboardDto.limit - 1

        const leaderboard = await this.redisService.zrevrange(leaderboardKey, start, end, true)

        const result: LeaderboardOutput[] = []
        for (let i = 0; i < leaderboard.length; i += 2) {
            const rank = start + i / 2
            const playerId = leaderboard[i]
            const score = Number(leaderboard[i + 1])

            result.push({
                rank: rank + 1,
                playerId,
                score: isNaN(score) ? 0 : score
            })
        }

        return {
            total: await this.redisService.zcard(leaderboardKey),
            result
        }
    }

    async getPlayerRank(gameId: string, playerId: string): Promise<{ rank: number; score: number | null }> {
        const leaderboardKey = `leaderboard:${gameId}`

        const rank = await this.redisService.zrevrank(leaderboardKey, playerId)

        const score = await this.redisService.zscore(leaderboardKey, playerId)

        return {
            rank: rank + 1,
            score
        }
    }
}
