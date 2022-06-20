import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Dashboard, Auth, AdminDashboard, Home } from "./pages";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./routes/RequireAuth";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <main className="flex justify-center items-center h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route element={<RequireAuth />}>
              <Route path="/account" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
};

export default App;
