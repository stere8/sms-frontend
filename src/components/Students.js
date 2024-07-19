// src/components/Students.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../settings';

const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/students`)
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the students!', error);
            });
    }, []);

    return (
        <div>
            <h1>Students</h1>
            <ul>
                {students.map(student => (
                    <li key={student.id}>{student.firstName} {student.lastName}</li>
                ))}
            </ul>
        </div>
    );
};

export default Students;
