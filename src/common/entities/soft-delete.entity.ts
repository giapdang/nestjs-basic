import { DeleteDateColumn } from 'typeorm';

export class SoftDelete {
  @DeleteDateColumn({
    nullable: true,
    select: false,
  })
  deleted_at: Date;
}
