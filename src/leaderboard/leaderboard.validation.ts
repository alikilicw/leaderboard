import * as Joi from 'joi'
import BaseValidation from 'src/common/base.validation'

export default class LeaderboardValidation extends BaseValidation {
    public static submitScore = Joi.object({
        gameId: this.objectId().required(),
        score: Joi.number().required()
    })

    public static getLeaderboard = this.pagination

    public static gameId = Joi.object({
        gameId: this.objectId().required()
    })
    public static playerId = Joi.object({
        playerId: this.objectId().required()
    })
}
