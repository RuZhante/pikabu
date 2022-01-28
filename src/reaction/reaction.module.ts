import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionService } from './services/reaction.service';
import { ReactionMutationResolver } from './resolvers/reaction.mutation.resolver';
import { ReactionRepository } from './reaction.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReactionRepository])],
  providers: [ReactionService, ReactionMutationResolver],
})
export class ReactionModule {}
