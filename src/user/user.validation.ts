import * as Joi from 'joi'
import BaseValidation from 'src/common/base.validation'
import { Gender } from './user.model'

export default class UserValidation extends BaseValidation {
    public static find = Joi.object({
        username: Joi.string().min(5).max(20).optional(),
        email: Joi.string().email().optional(),
        gender: Joi.string()
            .valid(...Object.values(Gender))
            .optional(),
        phone: Joi.string().min(5).max(20).optional()
    })

    public static update = Joi.object({
        username: Joi.string().min(5).max(20).optional(),
        email: Joi.string().email().optional(),
        gender: Joi.string()
            .valid(...Object.values(Gender))
            .optional(),
        phone: Joi.string().min(5).max(20).optional()
    })
}
