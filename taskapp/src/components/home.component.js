import React, { Component } from 'react';
import TaskDataService from '../task.service';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../global.css';
import { UserContext } from '../UserContext';

export default class Home extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      ipCount: 0,
      doneCount: 0,
      toDoCount: 0
    };
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.calculateTaskCounts = this.calculateTaskCounts.bind(this);
  }

  componentDidMount() {
    const { userId } = this.context;
    this.retrieveTasks(userId);
  }

  retrieveTasks(userId) {
    TaskDataService.getAll(userId)
      .then(response => {
        const tasks = response.data;
        this.setState({ tasks }, () => {
          this.calculateTaskCounts();
        });
      })
      .catch(error => {
        console.error('Error fetching tasks: ', error);
      });
  }

  refreshList() {
    const { userId } = this.context;
    this.retrieveTasks(userId);
    this.setState({
      currentTask: null,
      currentIndex: -1
    });
  }

  calculateTaskCounts() {
    const { tasks } = this.state;
    let ipCount = 0;
    let doneCount = 0;
    let toDoCount = 0;

    tasks.forEach(task => {
      switch (task.status) {
        case 'IN PROGRESS':
          ipCount++;
          break;
        case 'DONE':
          doneCount++;
          break;
        default:
          toDoCount++;
          break;
      }
    });

    this.setState({ ipCount, doneCount, toDoCount });
  }

  render() {
    const { ipCount, doneCount, toDoCount } = this.state;
    const { username, logoutUser } = this.context;
    const columnStyle = {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      backgroundColor: "#FAA0A0"
    };

    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={9} className="rounded-pill p-3 text-center mb-3">
            <h1>Welcome to your Task Center, {username}</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={3} className="rounded-pill p-3 text-center mb-3" style={{ ...columnStyle, backgroundColor: "#FAA0A0" }}>
            <h2>To Do</h2>
            <h5>{toDoCount}</h5>
          </Col>

          <Col md={3} className="rounded-pill p-3 text-center mb-3" style={{ ...columnStyle, backgroundColor: "#FAC898" }}>
            <h2>In Progress</h2>
            <h5>{ipCount}</h5>
          </Col>

          <Col md={3} className="rounded-pill p-3 text-center mb-3" style={{ ...columnStyle, backgroundColor: "#DAF7A6" }}>
            <h2>Done</h2>
            <h5>{doneCount}</h5>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={9} className="rounded-pill p-3 text-center mb-3">
            <h1>Action Center</h1>
          </Col>
        </Row>

        <Stack gap={3}>
          <Link to="/tasks" style={{ width: '100%' }}>
            <Button variant='secondary' style={{ width: '100%' }}>
              View tasks
            </Button>
          </Link>
          <Link to="/add-task" style={{ width: '100%' }}>
            <Button variant='secondary' style={{ width: '100%' }}>
              Add new task
            </Button>
          </Link>
          <Link to="/login" style={{ width: '100%' }}>
          <Button variant='danger' onClick={logoutUser} style={{ width: '100%' }}>
            Log out
          </Button>
          </Link>
        </Stack>
      </Container>
    );
  }
}
