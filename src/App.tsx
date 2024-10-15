import Layout from "./components/Layout";
import Toolbar from "./components/Toolbar";
import "./App.css";

const App = () => {
  return (
    <div className="bg-[#242424] w-screen h-screen flex items-center justify-center">
      <div className="relative w-screen h-screen sm:w-[350px] sm:h-[600px] rounded-md bg-white">
        <Layout />
        <Toolbar />
      </div>
    </div>
  );
};

export default App;
