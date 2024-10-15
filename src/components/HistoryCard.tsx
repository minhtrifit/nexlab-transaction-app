import { useNavigate } from "react-router-dom";
import { formatNumber } from "../helpers";
import { TRANSACTION_TYPE } from "../types";

interface PropType {
  history: TRANSACTION_TYPE;
}

const HistoryCard = (props: PropType) => {
  const { history } = props;

  const navigate = useNavigate();

  return (
    <div
      className="w-full px-4 py-2 flex items-center justify-between rounded-md
                    hover:cursor-pointer hover:bg-zinc-300"
      onClick={() => {
        navigate(`/detail/${history.id}`);
      }}
    >
      <div className="h-full flex items-center gap-3">
        <div
          style={{
            color: history.category.textColor,
            backgroundColor: history.category.bgColor,
          }}
          className="w-[45px] h-[45px] rounded-md flex items-center justify-center"
        >
          {history.category.icon}
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
