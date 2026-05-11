import { BrowserRouter, Routes, Route } from "react-router-dom";
import Waitlist from "./pages/Waitlist";
import WaitListForm from "./pages/WaitListForm";
import ViewWaitList from "./pages/ViewWaitList";
import Settings from "./pages/Settings";
import PropertyInquiry from "./pages/PropertyInquiry";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Waitlist />} />
        <Route path="/waitlist-form" element={<WaitListForm />} />
        <Route path="/admin/waitlist" element={<ViewWaitList />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/property-inquiry" element={<PropertyInquiry />} />
      </Routes>
    </BrowserRouter>
  );
}
