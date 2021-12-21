import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: '用户名称' })
  readonly username: string;

  @ApiPropertyOptional({ description: '用户头像' })
  readonly avatar: string;

  @ApiPropertyOptional({ description: '用户签名' })
  readonly signature: string;

  @ApiProperty({ description: '用户密码' })
  readonly password: string;
}
