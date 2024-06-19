import React, { useState, useContext } from "react";
import TaskDataService from "../task.service";
import "../global.css"
import { Button, Form } from 'react-bootstrap';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const { userId, loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TO DO');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const saveTask = async () => {
    try {
      const data = {
        title,
        description,
        status,
        dueDate: formatDate(dueDate),
        priority
      };

      const response = await TaskDataService.create(data, userId);
      console.log(response.data);
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      setErrorMessage('Failed to save task. Please try again.');
    }
  };

  const newTask = () => {
    setTitle('');
    setDescription('');
    setStatus('TO DO');
    setDueDate('');
    setPriority('');
    setSubmitted(false);
  };

  if (!loggedIn) {
    navigate('/login');
    return null;
  }

  const statuses = [
    { label: 'TO DO', value: 'TO DO' },
    { label: 'IN PROGRESS', value: 'IN PROGRESS' },
    { label: 'DONE', value: 'DONE' }
  ];

  const priorities = [
    { label: 'LOW', value: 'LOW' },
    { label: 'MEDIUM', value: 'MEDIUM' },
    { label: 'HIGH', value: 'HIGH' }
  ];

  return (
    <div className="submit-form">
        {submitted ? (
          <div>
            <br />
            <h4>Task added successfully!</h4>
            <Button variant="primary" href="/add-task" className="success">
              Add more?
            </Button>
          </div>
        ) : (
          <Form onSubmit={(e) => { e.preventDefault(); saveTask(); }}>
            <br/>
            <h3> Add new task</h3>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <br/>

          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
            />
          </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select onChange={(e) => setStatus(e.target.value)}>
                <option value=""> Select a status </option>
                {statuses.map((st) => (
                  <option key={st.label} value={st.value}>
                    {st.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>


            <Form.Group controlId="priority">
              <Form.Label>Priority</Form.Label>
              <Form.Select onChange={(e) => setPriority(e.target.value)}>
                <option value="">Select a priority</option>
                {priorities.map((pr) => (
                  <option key={pr.label} value={pr.value}>
                    {pr.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <br />
            <Button type="submit" variant="primary" size="md">
              Submit
            </Button>
          </Form>
        )   
      } </div>
  );
};
export default AddTask;
