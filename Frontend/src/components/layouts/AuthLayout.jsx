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
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        {/* Top Decorative Shape */}
        <div className="w-60 h-60 rounded-[50px] bg-purple-600 absolute -top-8 -left-10 opacity-90" />

        {/* Middle Decorative Shape */}
        <div className="w-60 h-72 rounded-[30px] border-2 border-fuchsia-500 absolute top-[30%] -right-20" />

        {/* Bottom Decorative Shape */}
        <div className="w-60 h-60 rounded-[50px] bg-violet-500 absolute -bottom-10 -left-10 opacity-90" />

        {/* Stats Card */}
        <div className="relative z-20 mt-12">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track your Income & Expenses"
            value="430,000"
            color="bg-primary"
          />
        </div>

        {/* Chart Image */}
        <img
          src={CARD_2}
          alt="Expense Tracker"
          className="w-[85%] absolute bottom-12 left-10 rounded-xl shadow-2xl shadow-blue-400/20 z-20"
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
    <div className="flex gap-6 bg-white p-5 rounded-2xl shadow-xl shadow-purple-400/10 border border-gray-100 max-w-md">
      {/* Icon */}
      <div
        className={`w-14 h-14 flex items-center justify-center text-[28px] text-white ${color} rounded-full drop-shadow-lg`}
      >
        {icon}
      </div>

      {/* Text */}
      <div>
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>

        <span className="text-3xl font-bold text-gray-900">${value}</span>
      </div>
    </div>
  );
};
