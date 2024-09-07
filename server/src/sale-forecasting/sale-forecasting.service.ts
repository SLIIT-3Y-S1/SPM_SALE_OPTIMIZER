import { Injectable } from '@nestjs/common';
import { CreateSaleDto, UpdateSaleDto } from './dto';
import { PrismaService } from 'src/database/prisma.service';
import { responseFormat } from 'src/common/types';

@Injectable()
export class SaleForecastingService {
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

  async create(createSaleDto: CreateSaleDto):Promise<responseFormat> {
    const result = await this.prismaService.sale.create({
      data:createSaleDto
    });
    return  this.commonResponse(result)
    
  }

  async findAll():Promise<responseFormat> {
    const result = await this.prismaService.sale.findMany(
      {
        orderBy:{
          created_at:"asc"
        }
      }
    );
    return  this.commonResponse(result)
  }

  async findOne(id: string):Promise<responseFormat> {
    const result = await this.prismaService.sale.findUnique({
      where:{sale_id:id}
    })
    return  this.commonResponse(result)
  }

async update(id: string, saleUpdate: UpdateSaleDto) {
      const saleExist = await this.findOne(id);
      if(saleExist.code === 200){
          const updateRecode = await this.prismaService.sale.update(
            {
              where:{sale_id:id},
              data:{
                quantity_sold:saleUpdate.quantity_sold,
                total_price:saleUpdate.total_price
              }
            }
          )
          return this.commonResponse(updateRecode)
      }
      
      return  this.commonResponse(saleExist)
  }

  async remove(id: string):Promise<any> {
    const isExist = await this.findOne(id);
    if(isExist.code === 200){
      const deleteResult = await this.prismaService.sale.delete({
        where:{sale_id:id}
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
    return isExist
  }
}
