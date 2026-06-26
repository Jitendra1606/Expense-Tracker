import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border border-gray-200/60
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        p-6
        flex
        items-center
        gap-5
        cursor-default
      "
    >
      <div
        className={`
          w-16
          h-16
          rounded-2xl
          flex
          items-center
          justify-center
          text-white
          text-3xl
          ${color}
          shadow-lg
        `}
      >
        {icon}
      </div>

      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-500">{label}</p>

        <h2 className="text-4xl font-bold text-gray-900 tracking-tight mt-1">
          ${value}
        </h2>
      </div>
    </div>
  );
};

export default InfoCard;
