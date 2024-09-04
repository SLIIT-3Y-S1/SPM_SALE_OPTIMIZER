import { Injectable } from '@nestjs/common';
import { CreateSpecialFunctionDto } from './dto/create-special-function.dto';
import { UpdateSpecialFunctionDto } from './dto/update-special-function.dto';

@Injectable()
export class SpecialFunctionService {
  create(createSpecialFunctionDto: CreateSpecialFunctionDto) {
    return 'This action adds a new specialFunction';
  }

  findAll() {
    return `This action returns all specialFunction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specialFunction`;
  }

  update(id: number, updateSpecialFunctionDto: UpdateSpecialFunctionDto) {
    return `This action updates a #${id} specialFunction`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialFunction`;
  }
}
