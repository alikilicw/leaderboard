import * as Joi from 'joi'
import mongoose from 'mongoose'

export default class BaseValidation {
    public static objectId = () =>
        Joi.string().custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid')
            }
            return value
        }, 'ObjectId validation')

    public static id = Joi.object({
        id: this.objectId().required()
    })

    public static pagination = Joi.object({
        page: Joi.number().min(0).optional(),
        limit: Joi.number().min(0).optional()
    })
}
