import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentMutationResolver } from './resolvers/comment.mutation.resolver';
import { CommentQueryResolver } from './resolvers/comment.query.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [CommentService, CommentMutationResolver, CommentQueryResolver],
  exports: [CommentService],
})
export class CommentModule {}
