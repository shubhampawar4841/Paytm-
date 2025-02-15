import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import { useRecoilValue } from "recoil";
import { tokenAtom, userAtom } from "../store/atoms";
import { getBalance } from "../services/operations/transactionApi";
import { Users } from "../components/Users";
import RandomBills from "../components/RandomBills";
import Transactions from "./Transactions";

const Dashboard = () => {
  const [balance, setBalance] = useState("");
  const [transactions, setTransactions] = useState([]); // ✅ Store transactions
  const token = useRecoilValue(tokenAtom);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const fetchBalance = async () => {
      const userBalance = await getBalance(token);
      setBalance(userBalance);
    };
    fetchBalance();
  }, [token]);

  return (
    <div>
      <Appbar user={user?.firstname || "User"} />
      <Balance balance={balance} />
      <Users />
      <RandomBills balance={balance} setBalance={setBalance} token={token} transactions={transactions} setTransactions={setTransactions} />
      <Transactions transactions={transactions} />
    </div>
  );
};

export default Dashboard;
