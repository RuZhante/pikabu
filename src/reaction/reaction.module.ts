import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionEntity } from './reaction.entity';
import { ReactionService } from './reaction.service';
import { ReactionMutationResolver } from './resolvers/reaction.mutation.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ReactionEntity])],
  providers: [ReactionService, ReactionMutationResolver],
})
export class ReactionModule {}
