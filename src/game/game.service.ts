import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Game } from './game.model'
import { CreateGameDto, FindGameDto, UpdateGameDto } from './game.type'

@Injectable()
export class GameService {
    constructor(@InjectModel('game') private readonly gameModel: Model<Game>) {}

    async create(createGameDto: CreateGameDto): Promise<Game> {
        const gameCheck = await this.gameModel.findOne({ name: createGameDto.name })
        if (gameCheck) throw new BadRequestException('Name is already in use.')

        return this.gameModel.create(createGameDto)
    }

    async find(findGameDto: FindGameDto): Promise<Game[]> {
        return await this.gameModel.find(findGameDto)
    }

    async findById(id: string): Promise<Game> {
        const game = await this.gameModel.findById(id)
        if (!game) throw new NotFoundException('Game not found.')

        return game
    }

    async update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
        const game = await this.findById(id)

        Object.assign(game, updateGameDto)
        return game.save()
    }

    async delete(id: string): Promise<void> {
        const deletedGame = await this.gameModel.findByIdAndDelete(id)
        if (!deletedGame) throw new NotFoundException('Game not found.')
    }
}
