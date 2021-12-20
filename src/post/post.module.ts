import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { PostMutationResolver } from './post.mutation.resolver';
import { PostQueryResolver } from './post.query.resolver';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostService, PostMutationResolver, PostQueryResolver],
  exports: [PostService],
})
export class PostModule {}
