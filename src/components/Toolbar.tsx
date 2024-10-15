import { useNavigate } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";

const Toolbar = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute bottom-0 w-full h-[50px] border-t-[1px] border-gray-400 p-2 rounded-t-xl">
      <button
        className="absolute left-1/2 transform -translate-x-1/2 bottom-6 bg-primary-green text-white p-2 rounded-full hover:bg-secondary-green"
        onClick={() => {
          navigate("/create");
        }}
      >
        <IoMdAdd size={30} />
      </button>
    </div>
  );
};

export default Toolbar;
