import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkModule } from 'src/bookmark/bookmark.module';
import { ReactionModule } from 'src/reaction/reaction.module';
import { CommentEntity } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentMutationResolver } from './resolvers/comment.mutation.resolver';
import { CommentQueryResolver } from './resolvers/comment.query.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    ReactionModule,
    BookmarkModule,
  ],
  providers: [CommentService, CommentMutationResolver, CommentQueryResolver],
  exports: [CommentService],
})
export class CommentModule {}
