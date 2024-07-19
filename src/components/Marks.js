// src/components/Marks.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../settings';

const Marks = () => {
    const [marks, setMarks] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/marks`)
            .then(response => {
                setMarks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the marks!', error);
            });
    }, []);

    return (
        <div>
            <h1>Marks</h1>
            <ul>
                {marks.map(mark => (
                    <li key={mark.id}>{mark.studentName} - {mark.score}</li>
                ))}
            </ul>
        </div>
    );
};

export default Marks;
