import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";

import Header from "../components/Header";
import BackBtn from "../components/BackBtn";
import CustomBtn from "../components/CustomBtn";
import Loading from "../components/Loading";

import { TRANSACTION_TYPE } from "../types";
import {
  DELETE_TRANSACTION,
  GET_TRANSACTION_BY_ID,
  GET_TRANSACTIONS,
} from "../queries/transaction.query";

import { MdOutlineCalendarToday } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const DetailTransaction = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { data: detailTransData, loading: detailTransLoading } = useQuery(
    GET_TRANSACTION_BY_ID,
    {
      variables: { id: params?.id },
    }
  );
  const [deleteTransactionMutation] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [{ query: GET_TRANSACTIONS }],
  });

  console.log(detailTransData);

  const trans: TRANSACTION_TYPE | null = useMemo(() => {
    if (!detailTransData) return null;

    return detailTransData?.transaction;
  }, [detailTransData]);

  const handleDeleteTransaction = async (id: string | null) => {
    if (
      confirm("Are you sure to delete this transaction?") == true &&
      id !== null
    ) {
      try {
        console.log("Delete:", id);

        const { data } = await deleteTransactionMutation({
          variables: {
            id: id,
          },
        });

        console.log("DELETE TRANS:", data.deleteTransaction);
        navigate("/");
        toast.success("Delete transaction successfully");
      } catch (error) {
        toast.error("Delete transaction failed");
        console.log("Delete transaction failed:", error);
      }
    }
  };

  return (
    <div>
      <Header>
        <BackBtn />
      </Header>
      {detailTransLoading ? (
        <Loading />
      ) : (
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
      )}
    </div>
  );
};

export default DetailTransaction;
