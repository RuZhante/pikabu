import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkService } from './services/bookmark.service';
import { BookmarkMutationResolver } from './resolvers/bookmark.mutation.resolver';
import { BookmarkQueryResolver } from './resolvers/bookmark.query.resolver';
import { BookmarkRepository } from './bookmark.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookmarkRepository])],
  providers: [BookmarkService, BookmarkMutationResolver, BookmarkQueryResolver],
})
export class BookmarkModule {}
