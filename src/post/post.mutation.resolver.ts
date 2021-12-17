import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { CurrentUser } from 'src/common/currentUser.decorator';
import { UserEntity } from 'src/user/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostModel } from './post.graphql';
import { PostService } from './post.service';

@Resolver(() => PostModel)
export class PostMutationResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => PostModel)
  @UseGuards(GqlAuthGuard)
  createPost(
    @Args('createPostDto') createPostDto: CreatePostDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.postService.create(createPostDto, user.id);
  }

  @Mutation(() => PostModel)
  @UseGuards(GqlAuthGuard)
  updatePost(@Args('updatePostDto') updatePostDto: UpdatePostDto) {
    return this.postService.update(updatePostDto);
  }

  @Mutation(() => PostModel)
  @UseGuards(GqlAuthGuard)
  removePost(@Args('id', { type: () => Int }) postId: number) {
    return this.postService.remove(postId);
  }
}
