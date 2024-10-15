import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHistoryStore } from "../store/History";

import Header from "../components/Header";
import BackBtn from "../components/BackBtn";
import { TRANSACTION_TYPE } from "../types";

import { MdOutlineCalendarToday } from "react-icons/md";
import { getCategoryByValue } from "../helpers";
import CustomBtn from "../components/CustomBtn";

const DetailTransaction = () => {
  const navigate = useNavigate();
  const params = useParams();

  const getTransactionById = useHistoryStore(
    (state) => state.getTransactionById
  );

  const [trans, setTrans] = useState<TRANSACTION_TYPE | null>(null);

  useEffect(() => {
    if (params?.id) {
      const transaction = getTransactionById(params?.id);
      if (transaction) {
        const category = getCategoryByValue(transaction.category);

        setTrans({ ...transaction, category: category.name });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div>
      <Header>
        <BackBtn />
      </Header>
      <section className="p-4 flex flex-col gap-2">
        <h1 className="text-xl font-bold text-primary-green">
          Transaction name: {trans?.name}
        </h1>
        <span className="flex items-center gap-1">
          <p className="font-bold">Type:</p>{" "}
          {trans?.type === "in" ? "Money in" : "Money out"}
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
