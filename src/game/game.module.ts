import { Module } from '@nestjs/common'
import { GameController } from './game.controller'
import { GameService } from './game.service'
import { MongooseModule } from '@nestjs/mongoose'
import { GameSchema } from './game.model'
import { AuthModule } from 'src/auth/auth.module'
import { CommonModule } from 'src/common/common.module'

@Module({
    imports: [MongooseModule.forFeature([{ name: 'game', schema: GameSchema }]), AuthModule, CommonModule],
    providers: [GameService],
    controllers: [GameController],
    exports: [GameService]
})
export class GameModule {}
