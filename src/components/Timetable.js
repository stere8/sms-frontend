// src/components/Timetable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../settings';

const Timetable = () => {
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/timetable`)
            .then(response => {
                setTimetable(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the timetable!', error);
            });
    }, []);

    return (
        <div>
            <h1>Timetable</h1>
            <ul>
                {timetable.map(record => (
                    <li key={record.id}>{record.className} - {record.lessonName}</li>
                ))}
            </ul>
        </div>
    );
};

export default Timetable;
