import React from "react";
import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h5 className="text-xl font-semibold text-gray-900">
            Recent Transactions
          </h5>

          <p className="text-sm text-gray-500 mt-1">
            Your latest income and expense activities
          </p>
        </div>

        <button className="card-btn" onClick={onSeeMore}>
          See All
          <LuArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      <div className="space-y-2">
        {transactions.length > 0 ? (
          transactions
            .slice(0, 5)
            .map((item) => (
              <TransactionInfoCard
                key={item._id}
                title={item.type === "expense" ? item.category : item.source}
                icon={item.icon}
                date={moment(item.date).format("DD MMM YYYY")}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
              />
            ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-gray-400 text-sm">
              No recent transactions found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
