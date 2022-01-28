import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../user.entity';
import { UserRepositoy } from '../user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoy) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.save(updateUserDto);

    return this.userRepository.findOne(user.id);
  }

  async remove(userId: number): Promise<UserEntity> {
    const user = await this.findOne(userId);
    return await this.userRepository.remove(user);
  }

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ username: username });
  }
}
