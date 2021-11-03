import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(username: string): Promise<User | undefined> {
    return await this.userRepository.findByUsername(username);
  }

  async findByUsernameIncludedPassword(
    username: string,
  ): Promise<User | undefined> {
    return await this.userRepository.findByUsernameIncludedPassword(username);
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  async create(body): Promise<User | undefined> {
    const { username, password, name } = body;
    const payload = {
      username,
      password: bcrypt.hashSync(password, 10),
      name,
    };
    return await this.userRepository.save(payload);
  }

  async updateOne(userId, body): Promise<User | undefined> {
    const { name } = body;
    const payload = {
      name,
    };
    await this.userRepository.update(userId, payload);
    return await this.findOne(userId);
  }
}
