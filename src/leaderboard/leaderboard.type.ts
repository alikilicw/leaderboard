import { Pagination } from 'src/common/types/pagination.type'

export type SubmitScoreDto = {
    gameId: string
    score: number
}

export type SubmitScoreServiceDto = SubmitScoreDto & {
    playerId: string
}

export type GetLeaderboardDto = Pagination
export type LeaderboardOutput = {
    score: number
    playerId: string
    rank: number
}
export type GetLeaderboardServiceOutputDto = {
    total: number
    result: LeaderboardOutput[]
}
