import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../settings";

// Dummy context—replace with your actual AuthContext
const AuthContext = React.createContext({
  userRole: "Student", // Example roles: "Admin", "Teacher", "Parent", "Student"
  userId: "1",         // Adjust type as needed
});

// Stub components for each dashboard view

const AdminDashboard = ({ data }) => (
  <div>
    <h2>Admin Dashboard</h2>
    <p>Total Students: {data.totalStudents}</p>
    <p>Total Teachers: {data.totalTeachers}</p>
    <p>Total Parents: {data.totalParents}</p>
  </div>
);

const TeacherDashboard = ({ data }) => (
  <div>
    <h2>Teacher Dashboard</h2>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

const ParentDashboard = ({ data }) => (
  <div>
    <h2>Parent Dashboard</h2>
    <ul>
      {data.map((student) => (
        <li key={student.studentId}>
          {student.firstName} {student.lastName}
        </li>
      ))}
    </ul>
  </div>
);

const StudentDashboard = ({ data }) => (
  <div>
    <h2>Student Dashboard</h2>
    <h3>Timetable</h3>
    <pre>{JSON.stringify(data.timetable, null, 2)}</pre>
    <h3>Attendance Summary</h3>
    <pre>{JSON.stringify(data.attendanceSummary, null, 2)}</pre>
    <h3>Marks</h3>
    <pre>{JSON.stringify(data.marks, null, 2)}</pre>
  </div>
);

const DashboardFrontPage = () => {
  const { userRole, userId } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let endpoint = "";
    if (userRole === "Admin") {
      endpoint = `${BASE_URL}/api/dashboard/admin`;
    } else if (userRole === "Teacher") {
      endpoint = `${BASE_URL}/api/dashboard/teacher/${userId}`;
    } else if (userRole === "Parent") {
      endpoint = `${BASE_URL}/api/dashboard/parent/${userId}`;
    } else if (userRole === "Student") {
      endpoint = `${BASE_URL}/api/dashboard/student/${userId}`;
    } else {
      setError("User role not recognized.");
      setLoading(false);
      return;
    }

    axios.get(endpoint)
      .then((res) => {
        setDashboardData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load dashboard data.");
        setLoading(false);
      });
  }, [userRole, userId]);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {userRole === "Admin" && <AdminDashboard data={dashboardData} />}
      {userRole === "Teacher" && <TeacherDashboard data={dashboardData} />}
      {userRole === "Parent" && <ParentDashboard data={dashboardData} />}
      {userRole === "Student" && <StudentDashboard data={dashboardData} />}
    </div>
  );
};

export default DashboardFrontPage;
