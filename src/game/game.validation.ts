import * as Joi from 'joi'
import BaseValidation from 'src/common/base.validation'

export default class GameValidation extends BaseValidation {
    public static create = Joi.object({
        name: Joi.string().min(5).max(20).optional()
    })

    public static find = Joi.object({
        name: Joi.string().min(5).max(20).optional()
    })

    public static update = Joi.object({
        name: Joi.string().min(5).max(20).optional()
    })
}
