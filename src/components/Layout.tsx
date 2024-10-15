import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Create from "../pages/Create";
import Edit from "../pages/Edit";
import DetailTransaction from "../pages/DetailTransaction";

const Layout = () => {
  return (
    <div className="w-full h-[calc(100%-50px)] overflow-y-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/detail/:id" element={<DetailTransaction />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Layout;
