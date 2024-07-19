// src/components/Staff.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../settings';

const Staff = () => {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/staff`)
            .then(response => {
                setStaff(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the staff!', error);
            });
    }, []);

    return (
        <div>
            <h1>Staff</h1>
            <ul>
                {staff.map(member => (
                    <li key={member.id}>{member.firstName} {member.lastName}</li>
                ))}
            </ul>
        </div>
    );
};

export default Staff;
