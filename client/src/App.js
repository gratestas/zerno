import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Dashboard, Auth, AdminDashboard, Home } from "./pages";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <main>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/account" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} exact />
            <Route path="/auth" element={<Auth />} exact />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
};

export default App;
