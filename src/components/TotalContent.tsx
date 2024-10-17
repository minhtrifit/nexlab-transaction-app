import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import {
  chartIncomeData,
  chartOptions,
  chartSpendingData,
} from "../utils/chart";
import { formatNumber, handleGetTotalAmountByType } from "../helpers";
import { GET_TRANSACTIONS } from "../queries/transaction.query";

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalContent = () => {
  const { data: transactionsData } = useQuery(GET_TRANSACTIONS);

  const [view, setView] = useState<"spending" | "income">("spending");

  const handleSetView = (view: "spending" | "income") => {
    setView(view);
  };

  const total = useMemo(() => {
    return handleGetTotalAmountByType(
      transactionsData?.transactions,
      view === "spending" ? "in" : "out"
    );
  }, [transactionsData, view]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center justify-center gap-3">
        <button
          className={`${
            view === "spending"
              ? "text-white bg-primary-green hover:bg-secondary-green"
              : "text-gray-500 bg-zinc-300 hover:bg-zinc-200"
          } p-2 text-sm rounded-md`}
          onClick={() => {
            handleSetView("spending");
          }}
        >
          Spending
        </button>
        <button
          className={`${
            view === "income"
              ? "text-white bg-primary-green hover:bg-secondary-green"
              : "text-gray-500 bg-zinc-300 hover:bg-zinc-200"
          } p-2 text-sm rounded-md`}
          onClick={() => {
            handleSetView("income");
          }}
        >
          Income
        </button>
      </div>
      <h2 className="text-gray-500 font-semibold">
        Total {view === "spending" ? "Spending" : "Income"}
      </h2>
      <h1 className="text-3xl font-bold">$ {formatNumber(total)}</h1>
      <div className="w-[250px] h-[250px]">
        <Pie
          data={view === "spending" ? chartSpendingData : chartIncomeData}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default TotalContent;
