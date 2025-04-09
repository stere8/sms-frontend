import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../settings';
import { Form, Button, Container } from 'react-bootstrap';

const AddEditStaff = () => {
  const [staff, setStaff] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    subjectExpertise: '', 
    userId: ''
  });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        let fetchedTeacher = null;
  
        // 1) If editing, fetch the teacher data
        if (id) {
          const teacherResp = await axiosInstance.get(`${BASE_URL}/api/staff/${id}`);
          fetchedTeacher = teacherResp.data;
          setStaff(fetchedTeacher);
        }
  
        // 2) Fetch unlinked teacher users
        const unlinkedResp = await axiosInstance.get(`${BASE_URL}/api/account/teacher/unlinked`);
        let fetchedUsers = Array.isArray(unlinkedResp.data) ? unlinkedResp.data : [];
        console.log('Unlinked users:', unlinkedResp);
        // 3) If editing and the teacher has a linked user,
        // add that user into the list if not already present.
        if (id && fetchedTeacher && fetchedTeacher.userId) {
          const exists = fetchedUsers.some(u => u.id === fetchedTeacher.userId);
          if (!exists) {
            // Use the teacher's existing email if available; otherwise a fallback.
            const teacherEmail = fetchedTeacher.user?.email || 'Assigned User';
            fetchedUsers.push({ id: fetchedTeacher.userId, email: teacherEmail });
          }
        }
  
        // 4) Log the final array for debugging purposes.
        console.log('Final unlinked teacher users:', fetchedUsers);
  
        // 5) Update state with the final list
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching data in AddEditStaff:', error);
      }
    };
  
    loadData();
  }, [id]);
  
  const handleChange = e => {
    const { name, value } = e.target;
    setStaff(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = { ...staff, userId: staff.userId };
    const request = id
      ? axiosInstance.put(`${BASE_URL}/api/staff/${id}`, payload)
      : axiosInstance.post(`${BASE_URL}/api/staff`, payload);

    request
      .then(() => navigate('/staff'))
      .catch(error => console.error('Error saving staff:', error));
  };

  return (
    <Container>
      <h1>{id ? 'Edit Staff' : 'Add Staff'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName" className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={staff.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="lastName" className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={staff.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={staff.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="subjectExpertise" className="mb-3">
          <Form.Label>Subject Expertise</Form.Label>
          <Form.Control
            type="text"
            name="subjectExpertise"
            value={staff.subjectExpertise}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="userId" className="mb-3">
          <Form.Label>Link User Account</Form.Label>
          <Form.Control
            as="select"
            name="userId"
            value={staff.userId || ''}
            onChange={handleChange}
          >
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          {id ? 'Update' : 'Add'}
        </Button>
      </Form>
    </Container>
  );
};

export default AddEditStaff;
