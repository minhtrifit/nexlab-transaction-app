import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useHistoryStore } from "../store/History";
import useScrollToRef from "../hooks/useScrollToRef";

import { TRANSACTION_TYPE } from "../types";
import { CATEGORIES } from "../utils/categories";
import { formatDate, saveLocalStorage } from "../helpers";

import Header from "../components/Header";
import BackBtn from "../components/BackBtn";
import TransactionForm from "../components/TransactionForm";

const Create = () => {
  const today = new Date();

  const [targetRef, scrollToTarget] = useScrollToRef();

  const addTransaction = useHistoryStore((state) => state.addTransaction);

  const [form, setForm] = useState<TRANSACTION_TYPE>({
    name: "",
    type: "out",
    category: CATEGORIES.gym.value,
    date: today.toISOString().split("T")[0],
    amount: 0,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTransaction = {
      ...form,
      id: uuidv4(),
      amount: Number(form.amount),
      date: formatDate(form.date),
    };

    console.log(newTransaction);
    const newTransactions = addTransaction(newTransaction);
    console.log(newTransactions);
    saveLocalStorage("transactions", newTransactions); // Save new data to local storage

    // Notification
    scrollToTarget();
    toast.success("Create new transaction successfully");

    // Reset form
    setForm({
      name: "",
      type: "out",
      category: CATEGORIES.gym.value,
      date: today.toISOString().split("T")[0],
      amount: 0,
    });
  };

  useEffect(() => {
    scrollToTarget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={targetRef}>
      <Header>
        <BackBtn />
      </Header>
      <section className="p-4">
        <h1 className="text-xl font-bold text-primary-green text-center">
          Create New Transaction
        </h1>
        <TransactionForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
        />
      </section>
    </div>
  );
};

export default Create;
