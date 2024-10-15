import { useNavigate } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";

const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      className="bg-primary-green text-white p-2 font-semibold rounded-md hover:bg-secondary-green
                    flex items-center gap-2"
      onClick={() => navigate(-1)}
    >
      <span className="text-sm">Back</span>
      <IoReturnUpBack size={20} />
    </button>
  );
};

export default BackBtn;
