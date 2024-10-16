import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistoryStore } from "../store/History";

import Header from "../components/Header";
import BackBtn from "../components/BackBtn";
import CustomBtn from "../components/CustomBtn";

import { TRANSACTION_TYPE } from "../types";
import { getCategoryByValue, handleGetTransactionData } from "../helpers";

import { MdOutlineCalendarToday } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { TRANSACTION_DATA } from "../utils/transactions";

const DetailTransaction = () => {
  const navigate = useNavigate();
  const params = useParams();

  const getTransactionById = useHistoryStore(
    (state) => state.getTransactionById
  );

  const transactions = useHistoryStore((state) => state.list);
  const deleteTransaction = useHistoryStore((state) => state.deleteTransaction);
  const updateTransactions = useHistoryStore(
    (state) => state.updateTransactions
  );

  const [trans, setTrans] = useState<TRANSACTION_TYPE | null>(null);

  const handleGetDetailTransaction = (id: string) => {
    const transaction = getTransactionById(id);
    if (transaction) {
      const category = getCategoryByValue(transaction.category);

      setTrans({ ...transaction, category: category.name });
    }
  };

  const handleDeleteTransaction = async (id: string | null) => {
    if (
      confirm("Are you sure to delete this transaction?") == true &&
      id !== null
    ) {
      // console.log("Delete:", id);
      const res = await deleteTransaction(id);
      console.log("DELETE TRANS:", res);

      if (res !== null) {
        navigate("/");
        toast.success("Delete transaction successfully");
      } else {
        toast.error("Delete transaction failed");
      }
    }
  };

  useEffect(() => {
    handleGetTransactionData(TRANSACTION_DATA, updateTransactions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (params?.id) handleGetDetailTransaction(params?.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, transactions]);

  return (
    <div>
      <Header>
        <BackBtn />
      </Header>
      <section className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-end">
          <button
            className="bg-red-500 text-white p-2 font-semibold rounded-md hover:bg-red-400
                        flex items-center gap-2"
            onClick={() => {
              handleDeleteTransaction(trans?.id ? trans?.id : null);
            }}
          >
            <span className="text-sm">Delete</span>
            <FaRegTrashAlt />
          </button>
        </div>
        <h1 className="text-xl font-bold text-primary-green">
          Transaction name: {trans?.name}
        </h1>
        <span className="flex items-center gap-1">
          <p className="font-bold">Type:</p>{" "}
          {trans?.type === "in" ? "Money in" : "Money out"}
        </span>
        <span className="flex items-center gap-1">
          <p className="font-bold">Amount:</p> {trans?.amount}
        </span>
        <span className="flex items-center gap-1">
          <p className="font-bold">Category:</p> {trans?.category}
        </span>
        <span className="flex items-center gap-1">
          <MdOutlineCalendarToday /> {trans?.date}
        </span>
        <div className="mt-3">
          <CustomBtn
            text={`Edit Transaction`}
            type="button"
            onClick={() => {
              navigate(`/edit/${params?.id}`);
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default DetailTransaction;
