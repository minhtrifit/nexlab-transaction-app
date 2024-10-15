import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { IoMdAdd } from "react-icons/io";
import { GrHomeRounded } from "react-icons/gr";
import { FaRegCreditCard } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

const Toolbar = () => {
  const navigate = useNavigate();

  const LEFT_TOOLBAR_LIST = [
    { name: "home", url: "/", icon: <GrHomeRounded size={20} /> },
    { name: "card", url: "/card", icon: <FaRegCreditCard size={20} /> },
  ];

  const RIGHT_TOOLBAR_LIST = [
    { name: "history", url: "/history", icon: <MdHistory size={25} /> },
    { name: "user", url: "/user", icon: <FaRegUser size={20} /> },
  ];

  return (
    <div
      className="absolute bottom-0 w-full h-[50px] border-t-[1px] border-gray-400 p-2 rounded-t-xl
                    flex items-center justify-center gap-[70px]"
    >
      <button
        className="absolute left-1/2 transform -translate-x-1/2 bottom-6 bg-primary-green text-white p-2 rounded-full hover:bg-secondary-green"
        onClick={() => {
          navigate("/create");
        }}
      >
        <IoMdAdd size={30} />
      </button>
      <div className="flex items-center gap-5">
        {LEFT_TOOLBAR_LIST.map(
          (item: { name: string; url: string; icon: React.ReactNode }) => {
            return (
              <button
                key={uuidv4()}
                className="p-2 rounded-md hover:text-secondary-green"
                onClick={() => {
                  navigate(`${item.url}`);
                }}
              >
                {item.icon}
              </button>
            );
          }
        )}
      </div>
      <div className="flex items-center gap-5">
        {RIGHT_TOOLBAR_LIST.map(
          (item: { name: string; url: string; icon: React.ReactNode }) => {
            return (
              <button
                key={uuidv4()}
                className="p-2 rounded-md hover:text-secondary-green"
                onClick={() => {
                  navigate(`${item.url}`);
                }}
              >
                {item.icon}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Toolbar;
