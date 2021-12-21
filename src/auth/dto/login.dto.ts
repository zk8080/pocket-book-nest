import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: '用户名必填' })
  @ApiProperty({ description: '用户名称' })
  readonly username: string;

  @IsNotEmpty({ message: '用户密码必填' })
  @ApiProperty({ description: '用户密码' })
  readonly password: string;
}
