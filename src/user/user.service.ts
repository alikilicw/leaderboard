import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { User } from './user.model'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto, FindUserDto, UpdateUserDto } from './user.type'

@Injectable()
export class UserService {
    constructor(
        @InjectModel('user')
        private readonly userModel: Model<User>
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userModel.findOne({
            $or: [{ username: createUserDto.username }, { email: createUserDto.email }, { phone: createUserDto.phone }]
        })

        if (existingUser) {
            if (existingUser.isActive) {
                if (existingUser.username === createUserDto.username) {
                    throw new BadRequestException('Username is already in use.')
                }
                if (existingUser.email === createUserDto.email) {
                    throw new BadRequestException('Email is already in use.')
                }
                if (existingUser.phone === createUserDto.phone) {
                    throw new BadRequestException('Phone is already in use.')
                }
            } else {
                /*
                    This may allow third parties to create accounts
                        with the same username, email, and phone number while creating a user
                */
                this.delete(existingUser.id)
            }
        }

        return this.userModel.create(createUserDto)
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find()
    }

    async find(findUserDto: FindUserDto): Promise<User[]> {
        return this.userModel.find(findUserDto)
    }

    async findOne(findUserDto: FindUserDto): Promise<User> {
        return this.userModel.findOne(findUserDto)
    }

    async findById(id: number, selectText?: string): Promise<User> {
        return this.userModel.findById(id).select(selectText)
    }

    async findByUsername(username: string, selectText?: string): Promise<User> {
        return this.userModel.findOne({ username }).select(selectText)
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findById(id)
        if (!user) throw new NotFoundException('User not found.')

        Object.assign(user, updateUserDto)
        return user.save()
    }

    async delete(id: number): Promise<void> {
        const deletedUser = await this.userModel.findByIdAndDelete(id)
        if (!deletedUser) throw new NotFoundException('User not found.')
    }
}
