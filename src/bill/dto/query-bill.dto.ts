import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class QueryBillDto {
  @ApiProperty({ description: '当前页' })
  readonly page?: number = 1;

  @ApiProperty({ description: '账单类型' })
  readonly page_size?: number = 5;

  @ApiProperty({ description: '消费类型' })
  readonly type_id: number = 0;

  @IsNotEmpty({ message: '日期不能为空！' })
  @ApiProperty({ description: '账单时间月份' })
  readonly date: string;
}
