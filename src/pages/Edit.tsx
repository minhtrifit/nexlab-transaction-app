import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
// import { useHistoryStore } from "../store/History";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { TRANSACTION_TYPE } from "../types";
import { CATEGORIES } from "../utils/categories";
import { formatDate, formatDateInput, getCategoryByValue } from "../helpers";
import {
  GET_TRANSACTION_BY_ID,
  UPDATE_TRANSACTION,
} from "../queries/transaction.query";

import Header from "../components/Header";
import BackBtn from "../components/BackBtn";
import TransactionForm from "../components/TransactionForm";

const Edit = () => {
  const today = new Date();

  const params = useParams();
  const navigate = useNavigate();

  const { data: detailTransData, loading } = useQuery(GET_TRANSACTION_BY_ID, {
    variables: { id: params?.id },
    fetchPolicy: "network-only",
  });
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION);

  const trans: TRANSACTION_TYPE | null = useMemo(() => {
    if (!detailTransData) return null;

    return detailTransData?.transaction;
  }, [detailTransData]);

  const [form, setForm] = useState<TRANSACTION_TYPE>({
    id: trans?.id ? trans?.id : "",
    name: trans?.name ? trans?.name : "",
    type: trans?.type ? trans?.type : "out",
    category: trans?.category ? trans?.category : CATEGORIES.gym.value,
    date: trans?.date
      ? formatDateInput(trans?.date)
      : today.toISOString().split("T")[0],
    amount: 0,
  });

  const handleGetEditTransaction = () => {
    if (trans) {
      const category = getCategoryByValue(trans.category);

      setForm({
        id: trans.id,
        name: trans.name,
        type: trans.type,
        category: category.value,
        date: formatDateInput(trans.date),
        amount: trans.amount,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedTransaction = {
        ...form,
        amount: Number(form.amount),
        date: formatDate(form.date),
      };

      if (updatedTransaction?.id) {
        // console.log(updatedTransaction);

        const { data } = await updateTransaction({
          variables: updatedTransaction,
        });

        console.log("Transaction updated:", data);

        toast.success("Edit transaction successfully");
        navigate(`/detail/${updatedTransaction?.id}`);
      }
    } catch (error) {
      toast.error("Edit transaction failed");
      console.log("Edit transaction failed:", error);
    }
  };

  useEffect(() => {
    if (params?.id) handleGetEditTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, trans]);

  return (
    <div>
      <Header>
        <BackBtn />
      </Header>
      <section className="p-4">
        <h1 className="text-xl font-bold text-primary-green text-center">
          Edit Transaction
        </h1>
        {!loading && (
          <TransactionForm
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
          />
        )}
      </section>
    </div>
  );
};

export default Edit;
