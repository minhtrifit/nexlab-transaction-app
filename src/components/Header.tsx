import { BiMoney } from "react-icons/bi";

interface PropType {
  children: React.ReactNode;
}

const Header = (props: PropType) => {
  const { children } = props;

  return (
    <header className="px-4 py-2 flex items-center justify-between text-primary-green">
      <div className="flex items-center gap-2">
        <BiMoney size={30} />
        <span className="font-bold">MyApp</span>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </header>
  );
};

export default Header;
