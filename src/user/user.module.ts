import { AuthModule } from 'src/auth/auth.module'
import { UserService } from './user.service'
import { CommonModule } from 'src/common/common.module'
import { UserSchema } from './user.model'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { forwardRef, Module } from '@nestjs/common'

@Module({
    imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]), forwardRef(() => AuthModule), CommonModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
