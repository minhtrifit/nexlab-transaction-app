import { useEffect, useState } from "react";
import { useHistoryStore } from "../store/History";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import {
  chartIncomeData,
  chartOptions,
  chartSpendingData,
} from "../utils/chart";
import { formatNumber } from "../helpers";

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalContent = () => {
  const [total, setTotal] = useState<number>(0);
  const [view, setView] = useState<"spending" | "income">("spending");

  const getTotalAmountByType = useHistoryStore(
    (state) => state.getTotalAmountByType
  );

  const handleSetView = (view: "spending" | "income") => {
    setView(view);
  };

  useEffect(() => {
    if (view === "spending") {
      const totalValue = getTotalAmountByType("in");
      setTotal(totalValue);
    } else if (view === "income") {
      const totalValue = getTotalAmountByType("out");
      setTotal(totalValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

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
