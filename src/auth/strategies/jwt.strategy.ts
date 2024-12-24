import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Constants } from 'src/common/constants.config'
import { User } from 'src/user/user.model'
import { UserService } from 'src/user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Constants.ACCESS_TOKEN_SECRET_KEY
        })
    }

    async validate(payload: any): Promise<User> {
        const user = await this.userService.findById(payload.id, '+confirmCode')

        if (user.isActive) delete user.confirmCode

        return user
    }
}
