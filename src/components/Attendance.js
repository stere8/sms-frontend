// src/components/Attendance.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../settings';

const Attendance = () => {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/attendance`)
            .then(response => {
                setAttendance(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the attendance!', error);
            });
    }, []);

    return (
        <div>
            <h1>Attendance</h1>
            <ul>
                {attendance.map(record => (
                    <li key={record.id}>{record.studentName} - {record.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default Attendance;
