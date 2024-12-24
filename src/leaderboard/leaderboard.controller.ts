import { Controller, Post, Body, Get, Param, Query, UseGuards, UsePipes, Req } from '@nestjs/common'
import { LeaderboardService } from './leaderboard.service'
import { GetLeaderboardDto, LeaderboardOutput, SubmitScoreDto, SubmitScoreServiceDto } from './leaderboard.type'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe'
import LeaderboardValidation from './leaderboard.validation'
import { Constants } from 'src/common/constants.config'
import { PaginationResponse, Response } from 'src/common/types/response.type'

@UseGuards(JwtAuthGuard)
@Controller('leaderboard')
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService) {}

    @Post('submit-score')
    @UsePipes(new JoiValidationPipe({ querySchema: LeaderboardValidation.submitScore }))
    async submitScore(@Req() req: any, @Body() submitScoreDto: SubmitScoreDto): Promise<void> {
        const submitScoreServiceDto: SubmitScoreServiceDto = {
            ...submitScoreDto,
            playerId: req.user._id
        }

        await this.leaderboardService.submitScore(submitScoreServiceDto)
    }

    @Get(':gameId')
    @UsePipes(
        new JoiValidationPipe({ paramSchema: LeaderboardValidation.gameId, querySchema: LeaderboardValidation.getLeaderboard })
    )
    async getLeaderboard(
        @Param() params: { gameId: string },
        @Query() getLeaderboardDto: GetLeaderboardDto
    ): Promise<PaginationResponse<LeaderboardOutput[]>> {
        const page = Number(getLeaderboardDto.page ?? Constants.DEFAULT_PAGINATION_PAGE)
        const limit = Number(getLeaderboardDto.limit ?? Constants.DEFAULT_PAGINATION_LIMIT)

        const output = await this.leaderboardService.getLeaderBoard(params.gameId, {
            page,
            limit
        })

        return {
            page,
            limit,
            total: output.total,
            data: output.result
        }
    }

    @Get(':gameId/rank')
    @UsePipes(new JoiValidationPipe({ paramSchema: LeaderboardValidation.gameId }))
    async getPlayerRank(@Req() req: any, @Param() params: { gameId: string }): Promise<any> {
        const rank = await this.leaderboardService.getPlayerRank(params.gameId, req.user._id)
        return { gameId: params.gameId, playerId: req.user._id, ...rank }
    }
}
