import { Gender, User } from './user.model'

export type CreateUserDto = Pick<User, 'username' | 'email' | 'gender' | 'phone' | 'password'>
export type FindUserDto = {
    id?: number
    username?: string
    email?: string
    gender?: Gender
    phone?: string
}
export type UpdateUserDto = FindUserDto
