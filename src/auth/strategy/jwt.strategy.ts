import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<UserEntity> | null {
    const userRepo = getRepository(UserEntity);
    const foundUser = await userRepo.findOne({
      username: payload.username,
    });

    return foundUser;
  }
}
