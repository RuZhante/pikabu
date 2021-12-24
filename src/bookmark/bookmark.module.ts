import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkEntity } from './bookmark.entity';
import { BookmarkService } from './bookmark.service';
import { BookmarkMutationResolver } from './resolvers/bookmark.mutation.resolver';
import { BookmarkQueryResolver } from './resolvers/bookmark.query.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([BookmarkEntity])],
  providers: [BookmarkService, BookmarkMutationResolver, BookmarkQueryResolver],
})
export class BookmarkModule {}
