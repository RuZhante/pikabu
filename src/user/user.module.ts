import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserMutationResolver } from './resolvers/user.mutation.resolver';
import { UserQueryResolver } from './resolvers/user.query.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PostModule],
  providers: [UserService, UserMutationResolver, UserQueryResolver],
  exports: [UserService],
})
export class UserModule {}
