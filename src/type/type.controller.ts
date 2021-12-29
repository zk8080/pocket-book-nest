import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TypeService } from './type.service';

@ApiTags('账单类型')
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @ApiOperation({ summary: '获取所有账单类型' })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard('jwt'))
  @Get('/findAll')
  findAll() {
    return this.typeService.findAll();
  }
}
