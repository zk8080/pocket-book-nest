import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BillDataDto {
  @IsNotEmpty({ message: '日期不能为空！' })
  @ApiProperty({ description: '账单时间月份' })
  readonly date: string;
}
