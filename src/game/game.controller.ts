import { Controller, Get, Post, Param, Body, NotFoundException, Query, UsePipes, Patch, Delete, UseGuards } from '@nestjs/common'
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { Response } from 'src/common/types/response.type'
import { GameService } from './game.service'
import GameValidation from './game.validation'
import { CreateGameDto, FindGameDto, UpdateGameDto } from './game.type'
import { Game } from './game.model'

@UseGuards(JwtAuthGuard)
@Controller('games')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Post()
    @UsePipes(new JoiValidationPipe({ querySchema: GameValidation.create }))
    async create(@Body() createGameDto: CreateGameDto): Promise<Response<Game>> {
        return {
            data: await this.gameService.create(createGameDto)
        }
    }

    @Get()
    @UsePipes(new JoiValidationPipe({ querySchema: GameValidation.find }))
    async find(@Query() findGameDto: FindGameDto): Promise<Response<Game[]>> {
        return {
            data: await this.gameService.find(findGameDto)
        }
    }

    @Get(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: GameValidation.id }))
    async findOne(@Param() param: { id: string }): Promise<Response<Game>> {
        const game = await this.gameService.findById(param.id)

        return {
            data: game
        }
    }

    @Patch(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: GameValidation.id, bodySchema: GameValidation.update }))
    async update(@Param() param: { id: string }, @Body() updateGameDto: UpdateGameDto): Promise<Response<Game>> {
        return {
            data: await this.gameService.update(param.id, updateGameDto)
        }
    }

    @Delete(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: GameValidation.id }))
    async delete(@Param() params: { id: string }): Promise<void> {
        await this.gameService.delete(params.id)
    }
}
