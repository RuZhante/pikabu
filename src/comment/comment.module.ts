import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkModule } from 'src/bookmark/bookmark.module';
import { ReactionModule } from 'src/reaction/reaction.module';
import { CommentService } from './services/comment.service';
import { CommentMutationResolver } from './resolvers/comment.mutation.resolver';
import { CommentQueryResolver } from './resolvers/comment.query.resolver';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
    ReactionModule,
    BookmarkModule,
  ],
  providers: [CommentService, CommentMutationResolver, CommentQueryResolver],
  exports: [CommentService],
})
export class CommentModule {}
