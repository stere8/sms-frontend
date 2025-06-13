import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../settings';
import { Form, Button } from 'react-bootstrap';

const AddEditEnrollment = () => {
  const [classes, setClasses]     = useState([]);
  const [students, setStudents]   = useState([]);
  const [classId, setClassId]     = useState('');
  const [studentId, setStudentId] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();
  console.log('ROUTE PARAM id:', id);
  console.log('BASE_URL is:', BASE_URL);

  useEffect(() => {
    // fetch & unwrap classes
    console.log('Fetching classes from:', `${BASE_URL}/api/classes`);
    axiosInstance.get(`${BASE_URL}/api/classes`)
      .then(response => {
        const list = Array.isArray(response.data)
          ? response.data
          : response.data.$values || [];
        console.log('UNWRAPPED CLASSES:', list);
        setClasses(list);
      })
      .catch(error => console.error('Error fetching classes:', error));

    // fetch & unwrap students
    console.log('Fetching students from:', `${BASE_URL}/api/students`);
    axiosInstance.get(`${BASE_URL}/api/students`)
      .then(response => {
        const list = Array.isArray(response.data)
          ? response.data
          : response.data.$values || [];
        console.log('UNWRAPPED STUDENTS:', list);
        setStudents(list);
      })
      .catch(error => console.error('Error fetching students:', error));

    // if editing, fetch existing enrollment
    if (id) {
      console.log('Fetching enrollment details from:', `${BASE_URL}/api/enrollments/${id}`);
      axiosInstance.get(`${BASE_URL}/api/enrollments/${id}`)
        .then(response => {
          console.log('ENROLLMENT response.data:', response.data);
          setClassId(response.data.classId);
          setStudentId(response.data.studentId);
        })
        .catch(error => console.error('Error fetching enrollment:', error));
    }
  }, [id]);

  const handleSubmit = event => {
    event.preventDefault();
    const enrollmentData = { classId, studentId, enrollmentId: id };
    console.log('About to submit enrollmentData:', enrollmentData);

    if (id) {
      console.log('PUT to:', `${BASE_URL}/api/enrollments/${id}`);
      axiosInstance.put(`${BASE_URL}/api/enrollments/${id}`, enrollmentData)
        .then(res => {
          console.log('Update response:', res.data);
          navigate('/enrollments');
        })
        .catch(error => console.error('Error updating enrollment:', error));
    } else {
      console.log('POST to:', `${BASE_URL}/api/enrollments`, enrollmentData);
      axiosInstance.post(`${BASE_URL}/api/enrollments`, enrollmentData)
        .then(res => {
          console.log('Create response:', res.data);
          navigate('/enrollments');
        })
        .catch(error => console.error('Error adding enrollment:', error));
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Enrollment' : 'Add Enrollment'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Class</Form.Label>
          <Form.Control
            as="select"
            value={classId}
            onChange={e => {
              console.log('Selected classId:', e.target.value);
              setClassId(e.target.value);
            }}
            required
          >
            <option value="">Select Class</option>
            {classes.map(({ viewedClass }) => (
  <option
    key={viewedClass.classId}
    value={viewedClass.classId}
  >
    {viewedClass.name}
  </option>
))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Student</Form.Label>
          <Form.Control
            as="select"
            value={studentId}
            onChange={e => {
              console.log('Selected studentId:', e.target.value);
              setStudentId(e.target.value);
            }}
            required
          >
            <option value="">Select Student</option>
            {students.map(s => (
              <option key={s.studentId} value={s.studentId}>
                {s.firstName} {s.lastName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          {id ? 'Update' : 'Add'} Enrollment
        </Button>
      </Form>
    </div>
  );
};

export default AddEditEnrollment;
