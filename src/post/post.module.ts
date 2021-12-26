import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from 'src/comment/comment.module';
import { PostEntity } from './post.entity';
import { PostMutationResolver } from './resolvers/post.mutation.resolver';
import { PostQueryResolver } from './resolvers/post.query.resolver';
import { PostService } from './post.service';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), CommentModule, TagModule],
  providers: [PostService, PostMutationResolver, PostQueryResolver],
  exports: [PostService],
})
export class PostModule {}
