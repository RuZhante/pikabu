import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/graphql-auth.guard';
import { DeleteResultModel } from 'src/common/delete-result.graphql';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserModel } from '../graphql.models/user.graphql';
import { UserService } from '../user.service';

@Resolver(() => UserModel)
export class UserMutationResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Mutation(() => UserModel)
  @UseGuards(GqlAuthGuard)
  updateUser(@Args('updateUserDto') updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Mutation(() => DeleteResultModel)
  @UseGuards(GqlAuthGuard)
  removeUser(@Args('id', { type: () => Int }) userId: number) {
    return this.userService.remove(userId);
  }
}
