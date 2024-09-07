import Link from "next/link"

const Sidebar = () => {
  return (
    <div className="sideMenu-outer w-[200px] h-screen  fixed border-2 border-red-500">
         <div className="sideMenu-inner">
            <div className="profile border-2 h-[100px]">
                <div className="profile-pic"></div>
                <div className="profile-name">John Doe</div>
            </div>
            <div className="menu border-2 ">
                <ul>
                    <li className=" border-2 border-blue-600 h-[50px] items-center flex justify-center">
                       
                          <div className="logo mr-5">Lo</div>
                          <div className="title">
                            <Link href={`/`}> Dashboard </Link>
                          </div>
                       
                    </li>
                    <li className=" border-2 border-blue-600 h-[50px] items-center flex justify-center">
                       
                          <div className="logo mr-5">Lo</div>
                          <div className="title">
                          <Link href={`/customer-segmentation`}> Customer </Link>
                          </div>
                       
                    </li>
                    <li className=" border-2 border-blue-600 h-[50px] items-center flex justify-center">
                       
                          <div className="logo mr-5">Lo</div>
                          <div className="title">
                          <Link href={`/inventory`}> Inventory </Link>
                          </div>
                       
                    </li>
                    <li className=" border-2 border-blue-600 h-[50px] items-center flex justify-center">
                       
                          <div className="logo mr-5">Lo</div>
                          <div className="title">
                          <Link href={`/sale-forecast`}> Sale </Link>
                          </div>
                       
                    </li>
                    <li className=" border-2 border-blue-600 h-[50px] items-center flex justify-center">
                       
                          <div className="logo mr-5">Lo</div>
                          <div className="title">
                          <Link href={`/special-function`}> Special Function </Link>
                          </div>
                       
                    </li>
                    
                </ul>

                </div>

         </div>
    </div>
  )
}

export default Sidebar