import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../settings';
import { Form, Button, Container } from 'react-bootstrap';

const AddEditStaff = () => {
  const [staff, setStaff] = useState({ firstName: '', lastName: '', email: '', subjectExpertise: '', userId: '' });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch unlinked teacher users
  useEffect(() => {
    axios.get(`${BASE_URL}/api/account/teacher/unlinked`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching unlinked users:', error));
  }, []);

  // If editing, fetch existing staff data and add its linked user (if any) to the dropdown list
  useEffect(() => {
    if (id) {
      axios.get(`${BASE_URL}/staff/${id}`)
        .then(response => {
          const staffData = response.data;
          setStaff(staffData);
          // If there's an already linked user, add it to the list (if not already present)
          if (staffData.userId && !users.some(u => u.id === staffData.userId)) {
            setUsers(prevUsers => [...prevUsers, { id: staffData.userId, email: staffData.user?.email || 'Linked User' }]);
          }
        })
        .catch(error => console.error('Error fetching staff data:', error));
    }
  }, [id, users]);

  const handleChange = e => {
    const { name, value } = e.target;
    setStaff(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = { ...staff, userId: staff.userId };
    const request = id ?
      axios.put(`${BASE_URL}/staff/${id}`, payload) :
      axios.post(`${BASE_URL}/staff`, payload);

    request.then(() => navigate('/staff'))
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
            value={staff.userId}
            onChange={handleChange}
            required
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
