import React from "react";

const Transactions = ({ transactions = [] }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions yet.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((txn) => (
            <li key={txn.id} className="flex justify-between py-2 border-b">
              <div className="text-sm font-semibold">{txn.name}</div>
              <div className="font-bold text-red-500">- ₹{txn.amount}</div>
              <div className="text-xs text-gray-600">{txn.date}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
