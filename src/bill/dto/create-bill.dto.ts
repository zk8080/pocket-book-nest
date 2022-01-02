import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty({ message: '金额必填！' })
  @ApiProperty({ description: '账单金额' })
  readonly amount: string;

  @IsNotEmpty({ message: '账单类型必填！' })
  @ApiProperty({ description: '账单类型' })
  readonly pay_type: 1 | 2;

  @IsNotEmpty({ message: '消费类型必填！' })
  @ApiProperty({ description: '消费类型' })
  readonly type_id: number;

  @IsNotEmpty({ message: '消费类型名称必填！' })
  @ApiProperty({ description: '消费类型名称' })
  readonly type_name: string;

  @IsNotEmpty({ message: '账单时间必填！' })
  @ApiProperty({ description: '账单时间' })
  readonly date: Date;

  @ApiProperty({ description: '用户id' })
  readonly user_id: string;

  @ApiProperty({ description: '备注' })
  readonly remark: string;
}
