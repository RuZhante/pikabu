import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './user.graphql';
import { UserService } from './user.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Query(() => [UserModel], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserModel, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) userId: number) {
    return this.userService.findOne(userId);
  }

  @Mutation(() => UserModel)
  updateUser(@Args('updateUserDto') updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Mutation(() => UserModel)
  removeUser(@Args('id', { type: () => Int }) userId: number) {
    return this.userService.remove(userId);
  }
}
