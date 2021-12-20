import { UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { GqlAuthGuard } from 'src/auth/guards/graphql-auth.guard';
import { AccessTokenModel } from '../auth/access-token.graphql';
import { LoginUserDto } from './dto/login-user.dto';
import { UserModel } from './user.graphql';
import { UserService } from './user.service';

@Resolver(() => UserModel)
export class UserQueryResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => [UserModel], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserModel, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => Int }) userId: number) {
    return this.userService.findOne(userId);
  }

  @Query(() => AccessTokenModel, { name: 'loginUser' })
  async login(
    @Args('loginUserDto', { type: () => LoginUserDto })
    loginUserDto: LoginUserDto,
  ) {
    const user = await this.authService.validateUser(
      loginUserDto.username,
      loginUserDto.password,
    );

    return await this.authService.login(user);
  }
}
