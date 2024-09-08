import { Injectable } from '@nestjs/common';
import { CreateCustomerSegmentDto } from './dto/create-customer-segment.dto';
import { UpdateCustomerSegmentDto } from './dto/update-customer-segment.dto';
import { PrismaService } from 'src/database/prisma.service';
import { responseFormat } from 'src/common/types';

@Injectable()
export class CustomerSegmentService {

  constructor(
    private readonly prismaService:PrismaService
  ) {}

  commonResponse(result:any):Promise<responseFormat>{
    if(!result){
      return Promise.resolve({
        code : 404,
        msg:"data not found",
        data:""
      });
    }
    return Promise.resolve({
      code:200,
      msg:"",
      data:result
    })
  }

  async create(createCustomerSegmentDto: CreateCustomerSegmentDto):Promise<responseFormat> {
    const result = await this.prismaService.customer.create({
      data:createCustomerSegmentDto
    });
    return  this.commonResponse(result)
    
  }
  async findAll():Promise<responseFormat> {
    const result = await this.prismaService.customer.findMany(
      {
        orderBy:{
          created_at:"asc"
        }
      }
    );
    return  this.commonResponse(result)
  }

  async findOne(id: string):Promise<responseFormat> {
    const result = await this.prismaService.customer.findUnique({
      where:{customer_id:id}
    })
    return  this.commonResponse(result)
  }

  async update(id: string, updateCustomerSegmentDto: UpdateCustomerSegmentDto) {
    const cusExist = await this.findOne(id);
    if(cusExist.code === 200){
        const updateRecode = await this.prismaService.customer.update(
          {
            where:{customer_id:id},
            data:{
              first_name:updateCustomerSegmentDto.first_name,
              last_name:updateCustomerSegmentDto.last_name,
              email:updateCustomerSegmentDto.email,
              phone_number:updateCustomerSegmentDto.phone_number,
            }
          }
        )
        return this.commonResponse(updateRecode)
    }
    
    return  this.commonResponse(cusExist)
}

async remove(id: string):Promise<any> {
  const cusExist = await this.findOne(id);
  if(cusExist.code === 200){
    const deleteResult = await this.prismaService.customer.delete({
      where:{customer_id:id}
    })
    if(!deleteResult){
      return Promise.resolve({
        code:401,
        msg:"",
        data:"delete failed"
      })
    }
    return Promise.resolve({
      code:200,
      msg:"",
      data:"successfully deleted"
    })
  }
  return cusExist
}
}