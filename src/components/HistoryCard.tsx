import { useNavigate } from "react-router-dom";
import { formatNumber, getCategoryByValue } from "../helpers";
import { TRANSACTION_TYPE } from "../types";

interface PropType {
  history: TRANSACTION_TYPE;
}

const HistoryCard = (props: PropType) => {
  const { history } = props;

  const navigate = useNavigate();

  const category = getCategoryByValue(history.category);

  return (
    <div
      className="w-full px-4 py-2 flex items-center justify-between rounded-md
                    hover:cursor-pointer hover:bg-zinc-200"
      onClick={() => {
        navigate(`/detail/${history.id}`);
      }}
    >
      <div className="h-full flex items-center gap-3">
        <div
          style={{
            color: category?.textColor,
            backgroundColor: category?.bgColor,
          }}
          className="w-[45px] h-[45px] rounded-md flex items-center justify-center"
        >
          {category?.icon}
        </div>
        <div>
          <h1 className="font-bold">{history.name}</h1>
          <span className="text-xs text-gray-600 font-semibold">
            {history.date}
          </span>
        </div>
      </div>
      <div className="h-full flex items-center">
        <span className="font-bold">
          {history.type === "in" ? "+" : "-"} ${formatNumber(history.amount)}
        </span>
      </div>
    </div>
  );
};

export default HistoryCard;
