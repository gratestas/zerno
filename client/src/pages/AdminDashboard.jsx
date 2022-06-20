import { Link } from "react-router-dom"

const AdminDashboard = () => {
  return (
    <div>
      <div>Admin Page</div>
      <Link to='/account' >To Dashboard</Link>
    </div>
  )
}

export default AdminDashboard