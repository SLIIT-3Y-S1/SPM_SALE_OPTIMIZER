import axios from "axios";

export interface Customer {

    
    customer_id: string;
    customer_name:string;
    first_name: string;
    last_name: string;
    email: string;
    dob:string;
    total_amount:string;
    phone_number: string;
    created_at: Date;
    updated_at: Date;
  }


export interface OrderStatusCounts {
  completed: number;
  pending: number;
  returned: number;
}

export interface OrderValueRanges {
  below5000: number;
  range5000_10000: number;
  range10001_20000: number;
  range20001_50000: number;
  above50000: number;
}

export interface PurchaseFrequency {
  "1-5": number;
  "6-10": number;
  "11-15": number;
  "16-20": number;
  "more than 20": number;
}

export const fetchPurchaseFrequency = async (): Promise<PurchaseFrequency | null> => {
  try {
      console.log('Fetching purchase frequency...');
      const response = await axios.get('http://localhost:5500/api/v1/customer-segment/purchase-frequency', {
          headers: {
              'Content-Type': 'application/json',
          },
      });

      console.log('API response:', response.data);
      
      // Correctly extract the frequency data
      const frequency = response.data?.data?.data; // Adjusted to access the correct property
      console.log('Extracted frequency:', frequency);

      return frequency ? frequency : null;
  } catch (error) {
      console.error('Error fetching purchase frequency:', error);
      return null;
  }
};

export const fetchOrderValueRanges = async (): Promise<OrderValueRanges | null> => {
  try {
    console.log('Fetching order value ranges...');
    const response = await axios.get('http://localhost:5500/api/v1/customer-segment/ordervalue', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Log the entire response to ensure correct structure
    console.log('API response:', response.data);
    
    // Extract the 'ranges' data from the nested 'data' property
    const ranges = response.data?.data?.ranges;
    console.log('Extracted ranges:', ranges); // Check if 'ranges' is being extracted
    
    return ranges ? ranges : null; // Return the ranges or null if undefined
  } catch (error) {
    console.error('Error fetching order value ranges:', error);
    return null;
  }
};

  export const fetchOrderStatusCounts = async (): Promise<OrderStatusCounts | null> => {
    try {
      // Make a GET request to the endpoint that returns order status counts
      const response = await axios.get('http://localhost:5500/api/v1/customer-segment/orders-by-status', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Extract the `data` property from the response
      return response.data.data; // Now this will return { completed, pending, returned }
    } catch (error) {
      console.error('Error fetching order status counts:', error);
      return null; // Return null in case of error
    }
  };
 
  export const fetchCustomers = async (): Promise<Customer[]> => {
    console.log('fetching...');
    try {
      const response = await axios.get('http://localhost:5500/api/v1/customer-segment', {
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed, like authentication
        },
      });
  
      return response.data.data; // Assuming your API returns data under `data`
    } catch (error) {
      console.error('Error fetching customers:', error);
      return [];
    }
  };
  
  export const saveCustomer = async (customerData: Omit<Customer, 'customer_id' | 'created_at' | 'updated_at'|'customer_name'|'total_amount'>): Promise<Customer | null> => {
    console.log(customerData)
    try {
      const response = await fetch('http://localhost:5500/api/v1/customer-segment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed (e.g., authorization)
        },
        body: JSON.stringify(customerData), // Send the cus data as JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to save customer data');
      }
  
      const data = await response.json();
      return data.data; // Assuming the API response includes the saved sale data under `data`
    } catch (error) {
      console.error('Error saving customer:', error);
      return null; // Return null in case of error
    }
  };
  

  export const updateCustomer = async (customerData: Omit<Customer, 'dob'|'created_at' | 'updated_at'|'customer_name'|'total_amount'>): Promise<Customer | null> => {
    console.log(customerData)
    try {
      const response = await fetch(`http://localhost:5500/api/v1/customer-segment/${customerData.customer_id}`, {
        method: 'PATCH', // Change from 'PUT' to 'PATCH'
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed (e.g., authorization)
        },
        body: JSON.stringify(customerData), // Send the updated customer data as JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to update customer data');
      }
  
      const data = await response.json();
      return data.data; // Assuming the API response includes the updated sale data under `data`
    } catch (error) {
      console.error('Error updating customer:', error);
      return null; // Return null in case of error
    }
  };
  

  export const deleteCustomer = async (customer_id: string): Promise<boolean> => {
    try {
      console.log("indide delete fun", customer_id)
      const res = await axios.delete(`http://localhost:5500/api/v1/customer-segment/${customer_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed (e.g., authorization)
        },
      });
      
      console.log("success")

      if (!res) {
        console.log(res)
        throw new Error('Failed to delete customer data');
      }
  
      return true; // Return true if deletion is successful
    } catch (error) {
      console.error('Error deleting customer:', error);
      return false; // Return false in case of error
    }
    
    
  }