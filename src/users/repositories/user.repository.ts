import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByUsername(username: string) {
    return await this.findOne({
      where: {
        username,
      },
    });
  }

  async findByUsernameIncludedPassword(username: string) {
    return await this.findOne({
      where: {
        username,
      },
      select: ['id', 'username', 'name', 'password'],
    });
  }
}
