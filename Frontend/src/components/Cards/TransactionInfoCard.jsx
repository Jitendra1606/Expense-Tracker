import React from "react";
import { addThousandsSeparator } from "../../utils/helper";

import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === "income" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600";

  return (
    <div
      className="
        group
        flex
        items-center
        justify-between
        gap-4
        p-4
        rounded-2xl
        transition-all
        duration-300
        hover:bg-gray-50
        hover:shadow-md
        hover:-translate-y-0.5
      "
    >
      {/* Left */}

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-100">
          {icon ? (
            <img src={icon} alt={title} className="w-8 h-8 object-contain" />
          ) : (
            <LuUtensils className="text-2xl text-gray-600" />
          )}
        </div>

        <div>
          <h4 className="font-semibold text-gray-800">{title}</h4>

          <p className="text-sm text-gray-500 mt-1">{date}</p>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        {!hideDeleteBtn && (
          <button
            onClick={onDelete}
            className="
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-300
              p-2
              rounded-lg
              hover:bg-red-50
              hover:text-red-600
              cursor-pointer
            "
          >
            <LuTrash2 size={18} />
          </button>
        )}

        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ${getAmountStyles()}`}
        >
          <span>
            {type === "income" ? "+" : "-"} ₹{addThousandsSeparator(amount)}
          </span>

          {type === "income" ? (
            <LuTrendingUp size={18} />
          ) : (
            <LuTrendingDown size={18} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
