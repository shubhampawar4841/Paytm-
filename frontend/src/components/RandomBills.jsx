import React, { useState, useEffect } from "react";
import { sendMoney } from "../services/operations/transactionApi";

const billTypes = ["Electricity", "Water", "Internet", "Rent", "Gas", "Phone"];
const getRandomAmount = () => (Math.random() * (2000 - 500) + 500).toFixed(2);

const RandomBills = ({ balance, setBalance, token, transactions, setTransactions }) => {
  const [bills, setBills] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const generateBills = () => {
      const newBills = billTypes.map((type) => ({
        name: type,
        amount: parseFloat(getRandomAmount()),
      }));
      setBills(newBills);
    };
    generateBills();
  }, []);

  const handlePayNow = async (bill) => {
    if (balance >= bill.amount) {
      const response = await sendMoney(bill.amount, "merchant_account_id", token);

      if (response === "Transfer successful") {
        setBalance((prevBalance) => prevBalance - bill.amount);

        // ✅ Add Transaction Immediately
        const newTransaction = {
          id: Date.now(),
          name: bill.name,
          amount: bill.amount,
          date: new Date().toLocaleString(),
        };

        setTransactions((prev) => [newTransaction, ...prev]); // ✅ Update Transactions

        setMessage(`✅ Paid ₹${bill.amount} for ${bill.name}`);
      } else {
        setMessage("❌ Payment failed. Try again.");
      }
    } else {
      setMessage("❌ Insufficient Balance");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Upcoming Bills</h2>
      <div className="mb-4 font-semibold">💰 Balance: ₹{balance}</div>

      <ul>
        {bills.map((bill, index) => (
          <li key={index} className="flex justify-between items-center py-2 border-b">
            <div>
              <span className="font-semibold">{bill.name}</span> - 
              <span className="font-bold"> ₹{bill.amount}</span>
            </div>
            <button
              onClick={() => handlePayNow(bill)}
              className="ml-4 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Pay Now
            </button>
          </li>
        ))}
      </ul>

      {message && (
        <div className="mt-3 text-center text-sm font-semibold text-gray-700">
          {message}
        </div>
      )}
    </div>
  );
};

export default RandomBills;
