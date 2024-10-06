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
      msg:"success",
      data:result
    })
  }

  async create(createCustomerSegmentDto: CreateCustomerSegmentDto):Promise<responseFormat> {
    const result = await this.prismaService.customer.create({
      data:createCustomerSegmentDto
    });
    return  this.commonResponse(result)
    
  }
  async findAll(): Promise<responseFormat> {
    const result = await this.prismaService.customer.findMany({
      select: {
        customer_id :true,
        first_name: true,
        last_name: true,
        phone_number: true,
        dob: true,
        email: true,
        orders: {
          select: {
            total_amount: true,
          },
          // Grouping orders by customer
          orderBy: {
            created_at: "asc",
          },
        },
      },
    });
  
    // Process the result to aggregate total amount per customer
    const responseData = result.map(customer => {
      const totalAmount = customer.orders.reduce((sum, order) => sum + order.total_amount, 0);
      return {
        customer_id : customer.customer_id,
        customer_name: `${customer.first_name} ${customer.last_name}`,
        phone_number: customer.phone_number,
        dob: customer.dob,
        email: customer.email,
        total_amount: totalAmount, // Sum of all orders
      };
    });
  
    return this.commonResponse(responseData);
  }

  async deleteAll(): Promise<responseFormat> {
    const result = await this.prismaService.$transaction([
      this.prismaService.order.deleteMany(), // Delete all orders
      this.prismaService.customer.deleteMany() // Delete all customers
    ]);
  
    // Return a response indicating success
    return this.commonResponse({
      message: "All customers and orders have been deleted successfully.",
      deletedCustomers: result[1].count, // Number of deleted customers
      deletedOrders: result[0].count // Number of deleted orders
    });
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

async remove(id: string): Promise<any> {
  // Check if the customer exists
  const cusExist = await this.findOne(id);
  if (cusExist.code === 200) {
    try {
      // Delete all orders associated with the customer
      await this.prismaService.order.deleteMany({
        where: { customer_id: id } // Ensure the foreign key matches the customer's ID
      });

      // Now delete the customer
      const deleteResult = await this.prismaService.customer.delete({
        where: { customer_id: id }
      });

      if (!deleteResult) {
        return Promise.resolve({
          code: 401,
          msg: "",
          data: "Delete failed"
        });
      }

      return Promise.resolve({
        code: 200,
        msg: "",
        data: "Successfully deleted"
      });
    } catch (error) {
      // Handle any error that occurs during deletion
      return Promise.resolve({
        code: 500,
        msg: "Error during deletion",
        data: error.message
      });
    }
  }

  return cusExist; // Return the existing customer if it was not found
}



//analitical customer segmentation analysis
async getOrderCountByValueRanges(): Promise<any> {
  // Fetch all orders and their total_amount
  const orders = await this.prismaService.order.findMany({
    select: {
      total_amount: true,
    },
  });

  // Initialize the counters for the ranges
  const ranges = {
    below5000: 0,
    range5000_10000: 0,
    range10001_20000: 0,
    range20001_50000: 0,
    above50000: 0,
  };

  // Categorize orders based on the total_amount
  orders.forEach(order => {
    const totalAmount = order.total_amount;

    if (totalAmount < 5000) {
      ranges.below5000 += 1;
    } else if (totalAmount >= 5000 && totalAmount <= 10000) {
      ranges.range5000_10000 += 1;
    } else if (totalAmount >= 10001 && totalAmount <= 20000) {
      ranges.range10001_20000 += 1;
    } else if (totalAmount >= 20001 && totalAmount <= 50000) {
      ranges.range20001_50000 += 1;
    } else if (totalAmount > 50000) {
      ranges.above50000 += 1;
    }
  });

  // Return the counts for each range
  return this.commonResponse({
    ranges
  });
}

async getPurchaseFrequency(): Promise<any> {
  try {
    // Fetch all orders and group by customer_id to count the frequency of purchases
    const orders = await this.prismaService.order.findMany({
      select: {
        customer_id: true,
      },
    });

    // Create a frequency map to count orders per customer
    const frequencyMap = orders.reduce<Record<string, number>>((acc, order) => {
      acc[order.customer_id] = (acc[order.customer_id] || 0) + 1;
      return acc;
    }, {});

    // Initialize frequency ranges
    const frequencyRanges = {
      '1-5': 0,
      '6-10': 0,
      '11-15': 0,
      '16-20': 0,
      'more than 20': 0,
    };

    // Categorize frequency counts
    for (const count of Object.values(frequencyMap)) {
      const numericCount = count as number;

      if (numericCount >= 1 && numericCount <= 5) {
        frequencyRanges['1-5'] += 1;
      } else if (numericCount >= 6 && numericCount <= 10) {
        frequencyRanges['6-10'] += 1;
      } else if (numericCount >= 11 && numericCount <= 15) {
        frequencyRanges['11-15'] += 1;
      } else if (numericCount >= 16 && numericCount <= 20) {
        frequencyRanges['16-20'] += 1;
      } else if (numericCount > 20) {
        frequencyRanges['more than 20'] += 1;
      }
    }

    // Return the categorized frequency counts
    return this.commonResponse(frequencyRanges);
  } catch (error) {
    console.error('Error fetching purchase frequency:', error);
    return this.commonResponse({ message: 'Error fetching data', error });
  }
}

async countOrdersByProvince(): Promise<any> {
  // Fetch the count of orders grouped by province
  const result = await this.prismaService.order.groupBy({
    by: ['province'], // Replace 'province' with the actual column name
    _count: {
      province: true, // This will give you the count of orders for each province
    },
  });

  // Prepare response
  return {
    code: 200,
    msg: 'success',
    data: result.map(entry => ({
      province: entry.province,
      order_count: entry._count.province,
    })),
  };
}
async countOrdersByStatus(): Promise<any> {
  try {
    // Count completed orders
    const completedOrdersCount = await this.prismaService.order.count({
      where: { order_status: 'completed' },
    });

    // Count pending orders
    const pendingOrdersCount = await this.prismaService.order.count({
      where: { order_status: 'pending' },
    });

    // Count returned orders
    const returnedOrdersCount = await this.prismaService.order.count({
      where: {order_status: 'returned' },
    });

    // Structure the result to show orders by status
    const result = {
      completed: completedOrdersCount,
      pending: pendingOrdersCount,
      returned: returnedOrdersCount,
    };

    // Return the counts for each status
    return {
      message: 'Order counts by status',
      data: result,
    };
  } catch (error) {
    console.error('Error counting orders by status:', error);
    return {
      message: 'Error counting orders by status',
      error: error.message,
    };
  }
}


}


