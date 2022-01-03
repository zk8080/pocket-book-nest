import { QueryBillDto } from './dto/query-bill.dto';
import { Bill } from './entities/bill.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import * as moment from 'moment';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
  ) {}

  async create(createBillDto: CreateBillDto) {
    const newBill = await this.billRepository.create(createBillDto);
    await this.billRepository.save(newBill);
    return;
  }

  async findAll(queryBillDto: QueryBillDto, user) {
    const { page, page_size, date, type_id } = queryBillDto;
    const { id: user_id } = user;
    const originList = await this.billRepository.find({ where: { user_id } });
    // 过滤出月份和类型所对应的账单列表
    const _list = originList.filter((item) => {
      if (type_id !== 0) {
        return (
          moment(String(item.date)).format('YYYY-MM') == date &&
          type_id == item.type_id
        );
      }
      return moment(String(item.date)).format('YYYY-MM') == date;
    });
    // 格式化数据，将其变成我们之前设置好的对象格式
    const listMap = _list
      .reduce((curr, item) => {
        // curr 默认初始值是一个空数组 []
        // 把第一个账单项的时间格式化为 YYYY-MM-DD
        const date = moment(String(item.date)).format('YYYY-MM-DD');
        // 如果能在累加的数组中找到当前项日期 date，那么在数组中的加入当前项到 bills 数组。
        if (
          curr &&
          curr.length &&
          curr.findIndex((item) => item.date == date) > -1
        ) {
          const index = curr.findIndex((item) => item.date == date);
          curr[index].bills.push(item);
        }
        // 如果在累加的数组中找不到当前项日期的，那么再新建一项。
        if (
          curr &&
          curr.length &&
          curr.findIndex((item) => item.date == date) == -1
        ) {
          curr.push({
            date,
            bills: [item],
          });
        }
        // 如果 curr 为空数组，则默认添加第一个账单项 item ，格式化为下列模式
        if (!curr.length) {
          curr.push({
            date,
            bills: [item],
          });
        }
        return curr;
      }, [])
      .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()); // 时间顺序为倒叙，时间约新的，在越上面

    // 分页处理，listMap 为我们格式化后的全部数据，还未分页。
    const filterListMap = listMap.slice(
      (page - 1) * page_size,
      page * page_size,
    );

    // 计算当月总收入和支出
    // 首先获取当月所有账单列表
    const __list = originList.filter(
      (item) => moment(String(item.date)).format('YYYY-MM') == date,
    );
    // 累加计算支出
    const totalExpense = __list.reduce((curr, item) => {
      if (item.pay_type == 1) {
        curr += Number(item.amount);
        return curr;
      }
      return curr;
    }, 0);
    // 累加计算收入
    const totalIncome = __list.reduce((curr, item) => {
      if (item.pay_type == 2) {
        curr += Number(item.amount);
        return curr;
      }
      return curr;
    }, 0);

    return {
      totalExpense, // 当月支出
      totalIncome, // 当月收入
      totalPage: Math.ceil(listMap.length / page_size), // 总分页
      list: filterListMap || [], // 格式化后，并且经过分页处理的数据
    };
  }

  async findOne(id: number) {
    return await this.billRepository.findOne(id);
  }

  async update(id: number, updateBillDto: UpdateBillDto) {
    const curBill = await this.billRepository.findOne(id);
    if (!curBill) {
      throw new HttpException('该账单不存在', HttpStatus.BAD_REQUEST);
    }
    const updatePost = this.billRepository.merge(curBill, updateBillDto);
    await this.billRepository.save(updatePost);
    return;
  }

  async remove(id: number) {
    const curBill = await this.billRepository.findOne(id);
    if (!curBill) {
      throw new HttpException('该账单不存在', HttpStatus.BAD_REQUEST);
    }
    await this.billRepository.remove(curBill);
    return;
  }
}
