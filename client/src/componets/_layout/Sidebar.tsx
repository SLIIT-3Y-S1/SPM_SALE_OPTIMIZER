'use client'

import React from "react";
import Link from "next/link";
import Header from "./Header";
import {usePathname} from 'next/navigation'

//import icons here
import { MdOutlineDashboard } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { MdOutlineInventory2 } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineAnalytics } from "react-icons/md";


const Sidebar = ({ children }) => {

  const pathname = usePathname()
  const isSelected = (pathname:string) =>{
    return location.pathname.includes(pathname)
  }

  return (
    <nav className="w-screen min-h-screen">
      <Header />
      <div className="flex items-start">
        <aside className=" h-svh w-60 border-r-2">
          <ul className="mt-5">
            <li className=" flex pt-2 pb-2 justify-start border-b-2 hover:bg-slate-400 ">
              <div className="spacer inline-flex ml-5">
                <div className="logo text-2xl mr-2">
                  <MdOutlineDashboard />
                </div>
                <div className="title">
                  <Link href={`/`}> Dashboard </Link>
                </div>
              </div>
            </li>
            <li className=" flex pt-2 pb-2 justify-start border-b-2 hover:bg-slate-400 ">
              <div className="spacer inline-flex ml-5">
                <div className="logo text-2xl mr-2">
                  <GoPeople />
                </div>
                <div className="title">
                  <Link href={`/customer-segmentation`}>
                    {" "}
                    Customer Analytics{" "}
                  </Link>
                </div>
              </div>
            </li>
            <li className=" flex pt-2 pb-2 justify-start border-b-2 hover:bg-slate-400 ">
              <div className="spacer inline-flex ml-5">
                <div className="logo text-2xl mr-2">
                  <MdOutlineInventory2 />
                </div>
                <div className="title">
                  <Link href={`/Inventory`}> Inventory </Link>
                </div>
              </div>
            </li>
            <li className=" flex pt-2 pb-2 justify-start border-b-2 hover:bg-slate-400 ">
            <div className="spacer inline-flex ml-5">
            <div className="logo text-2xl mr-2">
                  <RiMoneyDollarCircleLine />
              </div>
              <div className="title">
                <Link href={`/sale-forecast`}> Sale </Link>
              </div>
            </div>
            </li>
            <li className=" flex pt-2 pb-2 justify-start border-b-2 hover:bg-slate-400 ">
            <div className="spacer inline-flex ml-5">
              <div className="logo text-2xl mr-2">
              <MdOutlineAnalytics />
              </div>
              <div className="title">
                <Link href={`/special-function`}> Performance comparision  </Link>
              </div>
            </div>
            </li>
          </ul>
        </aside>
        {/*main container - displays all child components here*/}
        <main className="flex-1 mt-4 ml-4">{children}</main>
      </div>
    </nav>
  );
};

export default Sidebar;
