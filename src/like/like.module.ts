import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikePostEntity } from './like-post.entity';
import { LikeService } from './like.service';

@Module({
  imports: [TypeOrmModule.forFeature([LikePostEntity])],
  providers: [LikeService],
})
export class LikeModule {}
