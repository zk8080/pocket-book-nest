import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
const bcrypt = require('bcryptjs');

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({length: 100})
  username: string;

  @Column()
  avatar: string;

  @Column()
  signature: string;

  @Column({length: 100})
  password: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  // 该方法在数据插入之前调用，这样就能保证插入数据库的密码都是加密后的。
  @BeforeInsert() 
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password); 
  } 
}
