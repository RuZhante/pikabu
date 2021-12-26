import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/graphql-auth.guard';
import { PostTagDto } from '../dto/post-tag.dto';
import { TagModel } from '../graphql.models/tag.graphql';
import { TagService } from '../tag.service';

@Resolver(() => TagModel)
export class TagMutationResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => TagModel)
  @UseGuards(GqlAuthGuard)
  addTagtoPost(
    @Args('postTagDto', { type: () => PostTagDto })
    postTagDto: PostTagDto,
  ) {
    return this.tagService.addTagtoPost(postTagDto);
  }

  @Mutation(() => TagModel)
  @UseGuards(GqlAuthGuard)
  removeTagtoPost(
    @Args('postTagDto', { type: () => PostTagDto })
    postTagDto: PostTagDto,
  ) {
    return this.tagService.removeTagtoPost(postTagDto);
  }
}
