import React from "react";

// Assets
import CARD_2 from "../../assets/images/card.png";

// Icons
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* ================= LEFT SECTION ================= */}
      <div className="w-screen md:w-[60vw] h-screen px-12 pt-8 pb-12 flex flex-col">
        {/* Logo / App Name */}
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>

        {/* Login / Signup Content */}
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div className="hidden md:block w-[40vw] h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 overflow-hidden p-8 relative">
        {/* Top Decorative Shape */}
        <div className="absolute top-0 left-0 w-52 h-52 bg-gradient-to-br from-violet-500 to-purple-600 rounded-br-[80px] opacity-90" />

        {/* Middle Decorative Shape */}
        <div className="absolute top-56 right-6 w-44 h-60 rounded-[30px] border-2 border-fuchsia-300/70" />

        {/* Bottom Decorative Shape */}
        <div className="absolute bottom-0 left-0 w-56 h-32 bg-gradient-to-r from-violet-400 to-purple-500 rounded-tr-[70px] opacity-70" />

        {/* Stats Card */}
        <div className="relative z-20 mt-10 ml-8">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track your Income & Expenses"
            value="930,000"
            color="bg-primary"
          />
        </div>

        {/* Chart Image */}
        <img
          src={CARD_2}
          alt="Expense Tracker"
          className="w-[82%] absolute bottom-12 left-10 rounded-2xl shadow-2xl shadow-purple-300/30 z-20 hover:scale-[1.02] transition-all duration-500"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

/**
 * Reusable Statistics Card
 */
const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-5 rounded-2xl shadow-2xl shadow-violet-300/20 hover:-translate-y-1 transition-all duration-300 border border-gray-100 max-w-md">
      {/* Icon */}
      <div
        className={`w-14 h-14 flex items-center justify-center text-[28px] text-white ${color} rounded-full drop-shadow-lg`}
      >
        {icon}
      </div>

      {/* Text */}
      <div>
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>

        <span className="text-3xl font-bold text-gray-900">₹{value}</span>
      </div>
    </div>
  );
};
