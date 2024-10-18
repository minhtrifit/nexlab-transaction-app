import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
// import { useHistoryStore } from "../store/History";
import { useQuery } from "@apollo/client";

import { TRANSACTION_TYPE } from "../types";
// import { handleGetTransactionData } from "../helpers";
// import { TRANSACTION_DATA } from "../utils/transactions";
import { GET_TRANSACTIONS } from "../queries/transaction.query";

import Header from "../components/Header";
import TotalContent from "../components/TotalContent";
import HistoryCard from "../components/HistoryCard";
import Loading from "../components/Loading";

import { FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

const Home = () => {
  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionError,
  } = useQuery(GET_TRANSACTIONS);

  console.log(transactionsData);

  const historyTrans: TRANSACTION_TYPE[] = useMemo(() => {
    if (!transactionsData) return [];

    return transactionsData.transactions.map(
      (transaction: TRANSACTION_TYPE) => ({
        ...transaction,
      })
    );
  }, [transactionsData]); // computed when transactionsData changed

  if (transactionError)
    return (
      <div>
        <Header>
          <FaUser size={15} />
          <span className="text-sm font-semibold">Hello: Trí</span>
        </Header>
        <section>
          <h1 className="mt-10 text-center text-xl font-bold text-primary-green">
            Get transaction failed
          </h1>
        </section>
      </div>
    );

  return (
    <div>
      <Header>
        <FaUser size={15} />
        <span className="text-sm font-semibold">Hello: Trí</span>
      </Header>
      {transactionsLoading ? (
        <Loading />
      ) : (
        <>
          <section className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-1 text-gray-500 font-semibold">
              <span className="text-sm">*****91043</span>
              <button className="rounded-full hover:text-white hover:bg-secondary-green">
                <RiArrowDropDownLine size={20} />
              </button>
            </div>
            <div className="flex items-center gap-1 text-gray-500 font-semibold">
              <span className="text-sm">Weekly</span>
              <button className="rounded-full hover:text-white hover:bg-secondary-green">
                <RiArrowDropDownLine size={20} />
              </button>
            </div>
          </section>
          <section className="p-4">
            <TotalContent />
          </section>
          <section>
            <div className="px-4 flex items-center justify-between">
              <h1 className="text-md font-bold">Transaction history</h1>
              <div className="flex items-center gap-1 text-gray-500 font-semibold">
                <span className="text-sm">Today</span>
                <button className="rounded-full hover:text-white hover:bg-secondary-green">
                  <RiArrowDropDownLine size={20} />
                </button>
              </div>
            </div>
            <div className="my-5 flex flex-col">
              {historyTrans?.map((history: TRANSACTION_TYPE) => {
                return <HistoryCard key={uuidv4()} history={history} />;
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
