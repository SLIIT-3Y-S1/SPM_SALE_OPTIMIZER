import { Injectable } from '@nestjs/common';
import { CreateSaleDto, UpdateSaleDto } from './dto';
import { PrismaService } from 'src/database/prisma.service';
import { responseFormat } from 'src/common/types';
import puppeteer from 'puppeteer';

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

  /// generate report
  async generateReport(): Promise<responseFormat> {
    // Fetch the sales data
    const sales = await this.prismaService.sale.findMany();
    const totalSales = sales.reduce((acc, sale) => acc + sale.total_price, 0);
    const totalQuantity = sales.reduce((acc, sale) => acc + sale.quantity_sold, 0);

    // Create HTML content by injecting sales data
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
                  padding: 0;
                  line-height: 1.6;
              }
              h1, h2 {
                  text-align: center;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
              }
              table, th, td {
                  border: 1px solid black;
              }
              th, td {
                  padding: 10px;
                  text-align: left;
              }
          </style>
          <title>Sales Report</title>
      </head>
      <body>
          <h1>Sales Report</h1>
          <h2>Generated on: ${new Date().toLocaleDateString()}</h2>

          <table>
              <thead>
                  <tr>
                      <th>Total Sales</th>
                      <th>Total Quantity Sold</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>${totalSales}</td>
                      <td>${totalQuantity}</td>
                  </tr>
              </tbody>
          </table>

          <h3>Individual Sales Data:</h3>
          <table>
              <thead>
                  <tr>
                      <th>Sale ID</th>
                      <th>Total Price</th>
                      <th>Quantity Sold</th>
                  </tr>
              </thead>
              <tbody>
                  ${sales
                    .map(
                      sale => `
                  <tr>
                      <td>${sale.sale_id}</td>
                      <td>${sale.total_price}</td>
                      <td>${sale.quantity_sold}</td>
                  </tr>`
                    )
                    .join('')}
              </tbody>
          </table>
      </body>
      </html>`;

    // Launch Puppeteer and generate the PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });
    await browser.close();

    // Return PDF buffer or save it to a file
    return {
      code: 200,
      msg: 'PDF report generated successfully',
      data: pdfBuffer,  // You can return this buffer as a file stream
    };
  }


  async searchByOrderID(order_id: string):Promise<responseFormat> {
    const result = await this.prismaService.sale.findMany({
      where:{order_id:order_id}
    })
    return this.commonResponse(result)
  }
  
}
