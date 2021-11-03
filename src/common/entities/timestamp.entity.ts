import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SoftDelete } from './soft-delete.entity';

export class TimestampWithoutSoftDelete {
  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    insert: true,
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    insert: true,
    update: true,
  })
  updated_at: Date;
}

export class TimestampWithSoftDelete extends SoftDelete {
  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    insert: true,
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    insert: true,
    update: true,
  })
  updated_at: Date;
}
