import { Routes, Route } from "react-router";
import Create from "./Create";
import Upload from "./Upload";
import SetupChoice from "./SetupChoice";

export default function Setup() {
  return (
    <Routes>
      <Route index element={<SetupChoice />} />
      <Route path="create" element={<Create />} />
      <Route path="upload" element={<Upload />} />
    </Routes>
  );
}
