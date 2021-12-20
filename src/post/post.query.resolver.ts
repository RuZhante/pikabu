import { UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/graphql-auth.guard';
import { PostModel } from './post.graphql';
import { PostService } from './post.service';

@Resolver(() => PostModel)
export class PostQueryResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [PostModel], { name: 'posts' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => PostModel, { name: 'post' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => Int }) postId: number) {
    return this.postService.findOne(postId);
  }
}
