import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikePostEntity } from './like-post.entity';
import { LikeService } from './like.service';
import { LikeMutationResolver } from './resolvers/like.mutation.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([LikePostEntity])],
  providers: [LikeService, LikeMutationResolver],
})
export class LikeModule {}
