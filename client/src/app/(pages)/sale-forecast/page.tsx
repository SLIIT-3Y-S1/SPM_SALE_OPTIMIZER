import { SaleList } from "@/componets/sale-components/SaleList"
import { fetchSales, Sale } from "@/lib/services/saleServices";


const SaleForecastHomePage = async () => {
  // Fetch data directly inside the component
  const sales: Sale[] = await fetchSales();

  return (
   <div className='flex-row bg-red-800 w-full]'>
      Customer Home Page
       {/*your other components*/}
       <SaleList sales={sales} />
    </div>
  );
};



export default SaleForecastHomePage