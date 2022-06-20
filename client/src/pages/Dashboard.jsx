import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div>Dashboard</div>
      <Link to="/admin">To Admin Page</Link>
    </div>
  );
};

export default Dashboard;
