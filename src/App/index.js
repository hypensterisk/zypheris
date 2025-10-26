import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./Landing";
import Setup from "./Setup";
import Unlock from "./Unlock";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="setup/*" element={<Setup />} />
        <Route path="unlock" element={<Unlock />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
