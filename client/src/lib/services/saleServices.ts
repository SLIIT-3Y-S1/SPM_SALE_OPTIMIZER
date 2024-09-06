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
  