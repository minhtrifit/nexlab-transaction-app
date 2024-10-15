import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Create from "../pages/Create";
import Edit from "../pages/Edit";

const Layout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default Layout;
