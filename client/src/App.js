import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  Dashboard,
  Auth,
  AdminDashboard,
  Home,
  ForgotPassword,
  Unauthorized,
} from "./pages";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./routes/RequireAuth";
import PersistentAuth from "./routes/PersistentAuth";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <main className="flex flex-col justify-center items-center h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* PRIVATE ROUTES */}
            <Route element={<PersistentAuth />}>
              <Route element={<RequireAuth />}>
                <Route path="/account" element={<Dashboard />} />
              </Route>

              <Route element={<RequireAuth isAdmin />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Route>
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
};

export default App;
