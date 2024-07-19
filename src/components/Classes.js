// src/components/Classes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../settings';

const Classes = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/classes`)
            .then(response => {
                setClasses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the classes!', error);
            });
    }, []);

    return (
        <div>
            <h1>Classes</h1>
            <ul>
                {classes.map(classItem => (
                    <li key={classItem.id}>{classItem.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Classes;
