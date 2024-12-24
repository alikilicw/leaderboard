import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    UNKNOWN = 'unknown'
}

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ unique: true, required: true })
    username: string

    @Prop({ unique: true, required: true })
    email: string

    @Prop({ type: String, enum: Gender, default: Gender.UNKNOWN })
    gender: Gender

    @Prop({ unique: true, required: true })
    phone: string

    @Prop({ default: false })
    isActive: boolean

    @Prop({ required: true, select: false })
    password: string

    @Prop({ select: false })
    confirmCode: string
}

export const UserSchema = SchemaFactory.createForClass(User)
