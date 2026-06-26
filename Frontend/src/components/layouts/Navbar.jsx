import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuWalletMinimal } from "react-icons/lu";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="h-16 px-6 lg:px-8 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-gray-700 hover:text-primary transition-colors"
              onClick={() => setOpenSideMenu(!openSideMenu)}
            >
              {openSideMenu ? (
                <HiOutlineX className="text-2xl" />
              ) : (
                <HiOutlineMenu className="text-2xl" />
              )}
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
                <LuWalletMinimal className="text-xl" />
              </div>

              <div>
                <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
                  Expense Tracker
                </h1>

                <p className="text-xs text-gray-500">
                  Manage your finances smarter
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {openSideMenu && (
        <div className="fixed top-16 left-0 z-40 bg-white shadow-xl border-r border-gray-200">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </>
  );
};

export default Navbar;
