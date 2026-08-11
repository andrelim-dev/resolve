import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import SubmitComplaintPage from "./pages/SubmitComplaintPage";
import TrackComplaintPage from "./pages/TrackComplaintPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/submit-complaint" element={<SubmitComplaintPage />} />
      <Route path="/track-complaint" element={<TrackComplaintPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
