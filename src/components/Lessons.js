// src/components/Lessons.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../settings';

const Lessons = () => {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/lessons`)
            .then(response => {
                setLessons(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the lessons!', error);
            });
    }, []);

    return (
        <div>
            <h1>Lessons</h1>
            <ul>
                {lessons.map(lesson => (
                    <li key={lesson.id}>{lesson.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Lessons;
