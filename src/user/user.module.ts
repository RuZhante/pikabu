import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserMutationResolver } from './resolvers/user.mutation.resolver';
import { UserQueryResolver } from './resolvers/user.query.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from 'src/post/post.module';
import { UserRepositoy } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepositoy]), PostModule],
  providers: [UserService, UserMutationResolver, UserQueryResolver],
  exports: [UserService],
})
export class UserModule {}
