import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from 'src/post/post.repository';
import { TagMutationResolver } from './resolvers/tag.mutation.resolver';
import { TagService } from './services/tag.service';
import { TagRepository } from './tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository, PostRepository])],
  providers: [TagService, TagMutationResolver],
})
export class TagModule {}
