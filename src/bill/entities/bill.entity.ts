import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('bill')
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 账单类型
   * 1: 支出
   * 2: 收入
   */
  @Column()
  pay_type: 1 | 2;

  /**
   * 金额
   */
  @Column()
  amount: string;

  /**
   * 订单时间
   */
  @Column({
    name: 'date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  /**
   * 创建时间
   */
  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  /**
   * 消费类型id
   */
  @Column()
  type_id: number;

  /**
   * 消费类型名称
   */
  @Column()
  type_name: string;

  /**
   * 用户id
   */
  @Column()
  user_id: string;

  /**
   * 备注
   */
  @Column()
  remark: string;
}
