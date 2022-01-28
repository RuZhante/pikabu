import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostMutationResolver } from './resolvers/post.mutation.resolver';
import { PostQueryResolver } from './resolvers/post.query.resolver';
import { PostService } from './services/post.service';
import { PostRepository } from './post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  providers: [PostService, PostMutationResolver, PostQueryResolver],
  exports: [PostService],
})
export class PostModule {}
