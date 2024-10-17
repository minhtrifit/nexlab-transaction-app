import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import useScrollToRef from "../hooks/useScrollToRef";

import { TRANSACTION_TYPE } from "../types";
import { CATEGORIES } from "../utils/categories";
import { formatDate } from "../helpers";

import Header from "../components/Header";
import BackBtn from "../components/BackBtn";
import TransactionForm from "../components/TransactionForm";
import { useMutation } from "@apollo/client";
import {
  CREATE_TRANSACTION,
  GET_TRANSACTIONS,
} from "../queries/transaction.query";

const Create = () => {
  const today = new Date();

  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [{ query: GET_TRANSACTIONS }],
  });

  const [targetRef, scrollToTarget] = useScrollToRef();

  const [form, setForm] = useState<TRANSACTION_TYPE>({
    name: "",
    type: "out",
    category: CATEGORIES.gym.value,
    date: today.toISOString().split("T")[0],
    amount: 0,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newTransaction = {
        ...form,
        // id: uuidv4(),
        amount: Number(form.amount),
        date: formatDate(form.date),
      };

      const { data } = await createTransaction({
        variables: newTransaction,
      });

      console.log("Transaction created:", data);
      toast.success("Create transaction successfully");

      scrollToTarget();

      // Reset form
      setForm({
        name: "",
        type: "out",
        category: CATEGORIES.gym.value,
        date: today.toISOString().split("T")[0],
        amount: 0,
      });
    } catch (error) {
      toast.error("Create transaction failed");
      console.log("Create transaction failed:", error);
    }
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
