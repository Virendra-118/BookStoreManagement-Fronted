
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Registration";
import AdminDashboard from "./Pages/AdminDashboard";
import Unauthorized from "./Pages/Unauthorized";
import ProtectedRoute from "./Components/ProtectedRoute";
import CustomerDashboard from "./Pages/CustomerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />
        </Route>

        {/* Unauthorized Page */}
        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

        {/* Customer Routes */}
<Route element={<ProtectedRoute allowedRoles={["Customer"]} />}>
  <Route
    path="/customer-dashboard"
    element={<CustomerDashboard />}
  />
</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
