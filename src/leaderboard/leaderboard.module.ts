import { Module } from '@nestjs/common'
import { LeaderboardService } from './leaderboard.service'
import { LeaderboardController } from './leaderboard.controller'
import { CommonModule } from 'src/common/common.module'
import { GameModule } from 'src/game/game.module'

@Module({
    imports: [CommonModule, GameModule],
    providers: [LeaderboardService],
    controllers: [LeaderboardController]
})
export class LeaderboardModule {}
