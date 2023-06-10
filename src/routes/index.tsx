import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";

const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:link" element={<Home />} />
    </Routes>
  );
};

export default RoutesMain;
