import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminDashboard = () => {
  const [user, setUser] = useState();
  const { signout } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/api/users/profile", {
          signal: controller.signal,
        });
        console.log(response.data);
        setUser(response.data);
      } catch (err) {
        console.error(err);
        if (err.message !== "canceled")
          navigate("/auth", { state: { from: location }, replace: true });
      }
    };
    getUser();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <div>Admin Page</div>
      <Link to="/account">To Dashboard</Link>
      <br />
      <Link to="/">To Home</Link>
      <br />
      <button onClick={() => signout()}> sign out</button>
    </div>
  );
};

export default AdminDashboard;
