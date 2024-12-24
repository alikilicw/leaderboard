import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { CommonModule } from './common/common.module'
import { Constants } from './common/constants.config'
import { MongooseModule } from '@nestjs/mongoose'
import { GameModule } from './game/game.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
    imports: [MongooseModule.forRoot(Constants.DB_URL), AuthModule, UserModule, CommonModule, GameModule, LeaderboardModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
