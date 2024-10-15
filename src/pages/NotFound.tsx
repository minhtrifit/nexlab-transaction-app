import BackBtn from "../components/BackBtn";

const NotFound = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-3xl font-bold text-primary-green">404</h1>
        <span className="text-xl font-bold text-gray-500">PAGE NOT FOUND</span>
        <BackBtn />
      </div>
    </div>
  );
};

export default NotFound;
