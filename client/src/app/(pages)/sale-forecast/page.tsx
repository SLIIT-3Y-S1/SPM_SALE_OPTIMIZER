import { SaleList } from "@/componets/sale-components/SaleList"
import { fetchSales, Sale } from "@/lib/services/saleServices";


const SaleForecastHomePage = async () => {
  // Fetch data directly inside the component
  const sales: Sale[] = await fetchSales();

  return (
   <div className='bg-red-800 w-full h-full ml-[200px]'>
      Customer Home Page
       {/*your other components*/}
       <SaleList sales={sales} />
    </div>
  );
};



export default SaleForecastHomePage