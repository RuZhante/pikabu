import { EntityRepository, Repository } from 'typeorm';
import { ReactionEntity } from './reaction.entity';

@EntityRepository(ReactionEntity)
export class ReactionRepository extends Repository<ReactionEntity> {}
