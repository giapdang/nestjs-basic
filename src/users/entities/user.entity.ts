import { TimestampWithSoftDelete } from 'src/common/entities/timestamp.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;
}
