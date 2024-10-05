export interface Sale {
    sale_id: string;
    order_id: string;
    product_id: string;
    variant_id: string | null;
    quantity_sold: number;
    total_price: number;
    created_at: string;
    updated_at: string;
  }
  
  export const fetchSales = async (): Promise<Sale[]> => {
    console.log('fetching...')
    try {
      const response = await fetch('http://localhost:5500/api/v1/sale', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed, like authentication
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch sales data');
      }
  
      const data = await response.json();
      return data.data; // Assuming your API returns data under `data`
    } catch (error) {
      console.error('Error fetching sales:', error);
      return [];
    }
  };
  
  export const saveSale = async (saleData: Omit<Sale, 'sale_id' |'variant_id' |'created_at' | 'updated_at'>): Promise<Sale | null> => {
    console.log(saleData)
    try {
      const response = await fetch('http://localhost:5500/api/v1/sale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed (e.g., authorization)
        },
        body: JSON.stringify(saleData), // Send the sale data as JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to save sale data');
      }
  
      const data = await response.json();
      return data.data; // Assuming the API response includes the saved sale data under `data`
    } catch (error) {
      console.error('Error saving sale:', error);
      return null; // Return null in case of error
    }
  };
  

  export const updateSale = async (saleData: Omit<Sale, 'created_at' | 'updated_at'>): Promise<Sale | null> => {
    console.log(saleData)
    try {
      const response = await fetch(`http://localhost:5500/api/v1/sale/${saleData.sale_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed (e.g., authorization)
        },
        body: JSON.stringify(saleData), // Send the updated sale data as JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to update sale data');
      }
  
      const data = await response.json();
      return data.data; // Assuming the API response includes the updated sale data under `data`
    } catch (error) {
      console.error('Error updating sale:', error);
      return null; // Return null in case of error
    }
  }

  export const deleteSale = async (saleId: string): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:5500/api/v1/sale/${saleId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed (e.g., authorization)
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete sale data');
      }
  
      return true; // Return true if deletion is successful
    } catch (error) {
      console.error('Error deleting sale:', error);
      return false; // Return false in case of error
    }

  }
    // get sale by orderId
    export const searchByOrderID = async (order_id: string): Promise<Sale[] | null> => {
      try {
        const response = await fetch(`http://localhost:5500/api/v1/sale/search-by-orderID/${order_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed (e.g., authorization)
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch sale data');
        }
    
        const data = await response.json();
        // console.log(data, "data")
        return data.data; // Assuming your API returns data under `data`

      } catch (error) {
        console.error('Error fetching sale:', error);
        return null;
      }
    }
  