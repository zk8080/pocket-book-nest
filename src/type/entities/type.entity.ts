import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('type')
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: 1 | 2;

  @Column()
  user_id: string;
}
