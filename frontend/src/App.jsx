import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SubmitComplaintPage from "./pages/SubmitComplaintPage";
import TrackComplaintPage from "./pages/TrackComplaintPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import ComplaintManagementPage from "./pages/ComplaintManagementPage";
import ReportManagementPage from "./pages/ReportManagementPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/submit-complaint" element={<SubmitComplaintPage />} />
      <Route path="/track-complaint" element={<TrackComplaintPage />} />

      {/* Protected Staff Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/staff/dashboard" element={<DashboardPage />} />
        <Route
          path="/staff/complaint-management"
          element={<ComplaintManagementPage />}
        />
        <Route
          path="/staff/report-management"
          element={<ReportManagementPage />}
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
