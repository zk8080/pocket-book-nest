import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名必填' })
  @ApiProperty({ description: '用户名称' })
  readonly username: string;

  @ApiPropertyOptional({ description: '用户头像' })
  readonly avatar: string;

  @ApiPropertyOptional({ description: '用户签名' })
  readonly signature: string;

  @IsNotEmpty({ message: '用户密码必填' })
  @ApiProperty({ description: '用户密码' })
  readonly password: string;
}
