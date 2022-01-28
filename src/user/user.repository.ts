import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
@EntityRepository(UserEntity)
export class UserRepositoy extends Repository<UserEntity> {}
