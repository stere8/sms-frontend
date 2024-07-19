// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the CSS file

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/attendance">Attendance</Link></li>
                <li><Link to="/classes">Classes</Link></li>
                <li><Link to="/enrollments">Enrollments</Link></li>
                <li><Link to="/lessons">Lessons</Link></li>
                <li><Link to="/marks">Marks</Link></li>
                <li><Link to="/staff">Staff</Link></li>
                <li><Link to="/students">Students</Link></li>
                <li><Link to="/timetable">Timetable</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
