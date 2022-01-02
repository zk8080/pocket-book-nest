import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@ApiTags('账单')
@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth() // swagger文档设置token
  @Post('add')
  add(@Body() createBillDto: CreateBillDto, @Req() req) {
    const { id } = req.user;
    return this.billService.create({ ...createBillDto, user_id: id });
  }

  @Get()
  findAll() {
    return this.billService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billService.update(+id, updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(+id);
  }
}
