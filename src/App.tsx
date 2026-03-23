import { BrowserRouter, Routes, Route } from "react-router-dom";
import Waitlist from "./pages/Waitlist";
import WaitListForm from "./pages/WaitListForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Waitlist />} />
        <Route path="/waitlist-form" element={<WaitListForm />} />
      </Routes>
    </BrowserRouter>
  );
}
