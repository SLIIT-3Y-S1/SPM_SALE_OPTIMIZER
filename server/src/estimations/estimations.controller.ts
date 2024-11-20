import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { EstimationsService } from './estimations.service';
// import { CreateEstimationDto } from './dto/create-estimation.dto';
// import { UpdateEstimationDto } from './dto/update-estimation.dto';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Controller('estimations')
export class EstimationsController {
  constructor(private readonly estimationsService: EstimationsService) {}

  @Post()
  create(@Body() createEstimationDto: Prisma.EstimationsCreateInput) {
    return this.estimationsService.create(createEstimationDto);
  }

  @Get()
  findAll() {
    return this.estimationsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.estimationsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstimationDto: Prisma.EstimationsUpdateInput) {
    return this.estimationsService.update(+id, updateEstimationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estimationsService.remove(+id);
  }

  @Get('save/:nextMonth')
  async saveEstimations(@Param('nextMonth') nextMonth: string) {
    await this.estimationsService.fetchAndSaveEstimations(+nextMonth);
    return { message: 'Estimations saved successfully for month ' + nextMonth };
  }

  @Get('report')
  async getReport(@Res() res: Response) {
    try {
      const fileBuffer = await this.estimationsService.generateReport();

      // Set response headers for file download
      res.setHeader('Content-Disposition', 'attachment; filename=estimations_report.csv');
      res.setHeader('Content-Type', 'text/csv');

      // Send the CSV file buffer as the response
      res.send(fileBuffer);
    } catch (error) {
      console.error('Error generating report:', error); // Log detailed error
      res.status(500).send({
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      });
    }
  }
  
}
