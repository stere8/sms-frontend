import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../settings';
import { Form, Button } from 'react-bootstrap';

const AddEditTeacherEnrollment = () => {
    const [teachers, setTeachers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [teacherId, setTeacherId] = useState('');
    const [classId, setClassId] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/staff`)
            .then(response => setTeachers(response.data))
            .catch(error => console.error('Error fetching teachers:', error));

        axios.get(`${BASE_URL}/classes`)
            .then(response => setClasses(response.data))
            .catch(error => console.error('Error fetching classes:', error));

        if (id) {
            axios.get(`${BASE_URL}/teacher-enrollments/${id}`)
                .then(response => {
                    setTeacherId(response.data.staffId);
                    setClassId(response.data.classId);
                })
                .catch(error => console.error('Error fetching enrollment:', error));
        }
    }, [id]);

    const handleSubmit = event => {
        event.preventDefault();
        const enrollment = { staffId: teacherId, classId: classId };

        if (id) {
            axios.put(`${BASE_URL}/teacher-enrollments/${id}`, enrollment)
                .then(() => navigate('/teacher-enrollments'))
                .catch(error => console.error('Error updating enrollment:', error));
        } else {
            axios.post(`${BASE_URL}/teacher-enrollments`, enrollment)
                .then(() => navigate('/teacher-enrollments'))
                .catch(error => console.error('Error creating enrollment:', error));
        }
    };

    return (
        <div>
            <h1>{id ? 'Edit Teacher Enrollment' : 'Add Teacher Enrollment'}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="teacherSelect">
                    <Form.Label>Teacher</Form.Label>
                    <Form.Control as="select" value={teacherId} onChange={e => setTeacherId(e.target.value)} required>
                        <option value="">Select a teacher</option>
                        {teachers.map(teacher => (
                            <option key={teacher.staffId} value={teacher.staffId}>
                                {teacher.firstName} {teacher.lastName}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="classSelect">
                    <Form.Label>Class</Form.Label>
                    <Form.Control as="select" value={classId} onChange={e => setClassId(e.target.value)} required>
                        <option value="">Select a class</option>
                        {classes.map(classItem => (
                            <option key={classItem.classId} value={classItem.classId}>
                                {classItem.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {id ? 'Update Enrollment' : 'Add Enrollment'}
                </Button>
            </Form>
        </div>
    );
};

export default AddEditTeacherEnrollment;
