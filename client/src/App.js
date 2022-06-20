import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Dashboard, Auth, AdminDashboard, Home, Unauthorized } from "./pages";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./routes/RequireAuth";
import RequireAdmin from "./routes/RequireAdmin";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <main className="flex justify-center items-center h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route element={<RequireAuth />}>
              <Route path="/account" element={<Dashboard />} />
            </Route>

            <Route element={<RequireAdmin />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
};

export default App;
