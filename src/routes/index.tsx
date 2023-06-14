import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { Top100 } from "../pages/Top100";

const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/top100" element={<Top100 />} />
      <Route path="/:link" element={<Home />} />
    </Routes>
  );
};

export default RoutesMain;
