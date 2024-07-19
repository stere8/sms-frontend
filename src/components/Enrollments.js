// src/components/Enrollments.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../settings';

const Enrollments = () => {
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/enrollments`)
            .then(response => {
                setEnrollments(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the enrollments!', error);
            });
    }, []);

    return (
        <div>
            <h1>Enrollments</h1>
            <ul>
                {enrollments.map(enrollment => (
                    <li key={enrollment.enrollmentRef}>
                        {enrollment.enrolledStudent} - {enrollment.enrolledClass}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Enrollments;
