import Layout from "./components/Layout";
import Toolbar from "./components/Toolbar";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="bg-[#242424] w-screen h-screen flex items-center justify-center">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="relative w-screen h-screen sm:w-[350px] sm:h-[600px] rounded-md bg-white">
        <Layout />
        <Toolbar />
      </div>
    </div>
  );
};

export default App;
