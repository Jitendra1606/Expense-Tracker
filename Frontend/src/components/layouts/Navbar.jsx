import React, { useContext, useMemo, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { UserContext } from "../../context/UserContext";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const { user } = useContext(UserContext);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return {
        text: "Good Morning",
        emoji: "☀️",
      };
    }

    if (hour < 17) {
      return {
        text: "Good Afternoon",
        emoji: "🌤️",
      };
    }

    return {
      text: "Good Evening",
      emoji: "🌙",
    };
  }, []);

  return (
    <>
      <div className="flex items-center justify-between bg-white border-b border-gray-200 px-7 py-4 sticky top-0 z-30 shadow-sm">
        {/* Left */}

        <div className="flex items-center gap-4">
          <button
            className="block lg:hidden"
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            {openSideMenu ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>

          <div>
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
              Expense Tracker
            </h2>

            <p className="text-sm text-gray-500">
              Manage your finances smarter
            </p>
          </div>
        </div>

        {/* Right */}

        {user && (
          <div className="hidden md:block text-right">
            <p className="text-sm text-gray-500">
              {greeting.text} {greeting.emoji}
            </p>

            <h4 className="text-lg font-semibold text-gray-900">
              {user.fullname}
            </h4>
          </div>
        )}
      </div>

      {openSideMenu && (
        <div className="fixed top-[76px] left-0 bg-white shadow-xl z-50">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </>
  );
};

export default Navbar;
