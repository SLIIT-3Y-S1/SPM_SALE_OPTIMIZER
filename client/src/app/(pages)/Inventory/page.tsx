import React from "react"
import Link from "next/link"
import styles from './styles.module.css'

const InventoryHomePage = () => {
  return (
    // <div className='bg-red-800 w-full h-full ml-[200px]'>
    //   Inventory Home Page
    //    /// your other components
    // </div>
    <>
      <h1 className={styles.h1}>InventoryHomePage</h1>

      <div className={styles.dashboard}>
        <div className={styles.dashboardContent}>
          <p>Total Inventories: 10</p>
          <p>Total Inventories: 10</p>
          <p>Total Inventories: 10</p>
      </div>
        
      </div>

      <div className={styles.column}>
        <Link href='/Inventory/inventory-management' ><button className={styles.button}>Inventory Management</button></Link>
        <button className={styles.button}> Report Generation</button>
        <button className={styles.button}> Integrate with Sales Forecasting</button>
      </div>
    </>
    
  )
}

export default InventoryHomePage