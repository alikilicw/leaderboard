import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Game extends Document {
    @Prop({ unique: true, required: true })
    name: string
}

export const GameSchema = SchemaFactory.createForClass(Game)
