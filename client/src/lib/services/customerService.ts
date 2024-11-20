export interface Customer {

    
    customer_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    created_at: Date;
    updated_at: Date;
  }
  
  export const fetchCustomers = async (): Promise<Customer[]> => {
    console.log('fetching...')
    try {
      const response = await fetch('http://localhost:5500/customer-segment', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed, like authentication
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch customer data');
      }
  
      const data = await response.json();
      return data.data; // Assuming your API returns data under `data`
    } catch (error) {
      console.error('Error fetching customers:', error);
      return [];
    }
  };
  
  export const saveCustomer = async (customerData: Omit<Customer, 'customer_id' | 'created_at' | 'updated_at'>): Promise<Customer | null> => {
    console.log(customerData)
    try {
      const response = await fetch('http://localhost:5500/customer-segment', {
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
  

  export const updateCustomer = async (customerData: Omit<Customer, 'created_at' | 'updated_at'>): Promise<Customer | null> => {
    console.log(customerData)
    try {
      const response = await fetch(`http://localhost:5500/customer-segment/${customerData.customer_id}`, {
        method: 'PUT',
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
  }

  export const deleteCustomer = async (customer_id: string): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:5500/customer-segment/${customer_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed (e.g., authorization)
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete customer data');
      }
  
      return true; // Return true if deletion is successful
    } catch (error) {
      console.error('Error deleting customer:', error);
      return false; // Return false in case of error
    }
  }