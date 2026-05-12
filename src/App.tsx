import { BrowserRouter, Routes, Route } from "react-router-dom";
import Waitlist from "./pages/Waitlist";
import WaitListForm from "./pages/WaitListForm";
import PropertyInquiry from "./pages/PropertyInquiry";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Waitlist />} />
        <Route path="/waitlist-form" element={<WaitListForm />} />
        <Route path="/property-inquiry" element={<PropertyInquiry />} />
      </Routes>
    </BrowserRouter>
  );
}
