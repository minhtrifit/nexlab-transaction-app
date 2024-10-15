interface PropType {
  text: string;
  type: "button" | "submit";
  onClick?: () => void;
}

const CustomBtn = (props: PropType) => {
  const { text, type, onClick } = props;

  return (
    <button
      type={type}
      className="w-full text-md text-white font-semibold bg-primary-green rounded-md px-2 py-1"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomBtn;
