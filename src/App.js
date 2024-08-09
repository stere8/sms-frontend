import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavigationBar';
import Attendance from './components/Attendance';
import Classes from './components/Classes';
import Enrollments from './components/Enrollments';
import Lessons from './components/Lessons';
import Marks from './components/Marks';
import Staff from './components/Staff';
import Students from './components/Students';
import Timetable from './components/Timetable';
import AddEditStudent from './components/AddEditStudent';
import AddEditStaff from './components/AddEditStaff';
import AddEditEnrollment from './components/AddEditEnrollment';
import AddEditTeacherEnrollment from './components/AddEditTeacherEnrollment';
import TeacherEnrollments from "./components/TeacherEnrollments";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/attendance" element={<Attendance/>} />
                <Route exact path="/classes" element={<Classes/>} />
                <Route path="/classes/:id" element={<Classes/>} />
                <Route exact path="/enrollments" element={<Enrollments/>} />
                <Route path="/enrollments/add" element={<AddEditEnrollment/>} />
                <Route path="/enrollments/edit/:id" element={<AddEditEnrollment/>} />
                <Route exact path="/teacher-enrollments" element={<TeacherEnrollments/>} />
                <Route path="/teacher-enrollments/add" element={<AddEditTeacherEnrollment/>} />
                <Route path="/teacher-enrollments/edit/:id" element={<AddEditTeacherEnrollment/>} />
                <Route path="/lessons" element={<Lessons/>} />
                <Route path="/marks" element={<Marks/>} />
                <Route exact path="/staff" element={<Staff/>} />
                <Route path="/staff/add" element={<AddEditStaff/>} />
                <Route path="/staff/edit/:id" element={<AddEditStaff/>} />
                <Route exact path="/students" element={<Students/>} />
                <Route path="/students/add" element={<AddEditStudent/>} />
                <Route path="/students/edit/:id" element={<AddEditStudent/>} />
                <Route path="/timetable" element={<Timetable/>} />
            </Routes>
        </Router>
    );
}

export default App;
