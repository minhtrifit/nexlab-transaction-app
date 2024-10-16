import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistoryStore } from "../store/History";
import { useNavigate, useParams } from "react-router-dom";

import { TRANSACTION_TYPE } from "../types";
import { CATEGORIES } from "../utils/categories";
import { TRANSACTION_DATA } from "../utils/transactions";
import {
  formatDate,
  formatDateInput,
  getCategoryByValue,
  handleGetTransactionData,
} from "../helpers";

import Header from "../components/Header";
import BackBtn from "../components/BackBtn";
import TransactionForm from "../components/TransactionForm";

const Edit = () => {
  const today = new Date();

  const params = useParams();
  const navigate = useNavigate();

  const transactions = useHistoryStore((state) => state.list);
  const getTransactionById = useHistoryStore(
    (state) => state.getTransactionById
  );
  const updateTransactions = useHistoryStore(
    (state) => state.updateTransactions
  );

  const updateTransactionsById = useHistoryStore(
    (state) => state.updateTransactionsById
  );

  const [form, setForm] = useState<TRANSACTION_TYPE>({
    id: "",
    name: "",
    type: "out",
    category: CATEGORIES.gym.value,
    date: today.toISOString().split("T")[0],
    amount: 0,
  });

  const handleGetEditTransaction = (id: string) => {
    const transaction = getTransactionById(id);
    if (transaction) {
      const category = getCategoryByValue(transaction.category);

      setForm({
        id: transaction.id,
        name: transaction.name,
        type: transaction.type,
        category: category.value,
        date: formatDateInput(transaction.date),
        amount: transaction.amount,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedTransaction = {
      ...form,
      amount: Number(form.amount),
      date: formatDate(form.date),
    };

    if (updatedTransaction?.id) {
      // console.log(updatedTransaction);

      const res = await updateTransactionsById(
        updatedTransaction?.id,
        updatedTransaction
      );

      console.log("EDIT TRANS", res);

      if (res !== null) {
        navigate(`/detail/${updatedTransaction?.id}`);
        toast.success("Update transaction successfully");
      } else {
        toast.error("Update transaction failed");
      }
    }
  };

  useEffect(() => {
    handleGetTransactionData(TRANSACTION_DATA, updateTransactions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (params?.id) handleGetEditTransaction(params?.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, transactions]);

  return (
    <div>
      <Header>
        <BackBtn />
      </Header>
      <section className="p-4">
        <h1 className="text-xl font-bold text-primary-green text-center">
          Edit Transaction
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

export default Edit;
