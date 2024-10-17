import { useMemo } from "react";
import { toast } from "react-toastify";
// import { useHistoryStore } from "../store/History";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { TRANSACTION_TYPE } from "../types";
import { formatDate } from "../helpers";
import {
  GET_TRANSACTION_BY_ID,
  UPDATE_TRANSACTION,
} from "../queries/transaction.query";

import Header from "../components/Header";
import BackBtn from "../components/BackBtn";
import TransactionForm from "../components/TransactionForm";

const Edit = () => {
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    form: TRANSACTION_TYPE
  ) => {
    e.preventDefault();

    try {
      const updatedTransaction = {
        ...form,
        amount: Number(form.amount),
        date: formatDate(form.date),
      };

      if (updatedTransaction?.id) {
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
            formDefaultValue={trans}
            handleSubmit={handleSubmit}
          />
        )}
      </section>
    </div>
  );
};

export default Edit;
