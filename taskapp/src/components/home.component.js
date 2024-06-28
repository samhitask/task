import React, { Component } from 'react';
import TaskDataService from '../task.service';
import { Container, Row, Col, Button, Stack, Card } from 'react-bootstrap';
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
      toDoCount: 0,
      pastDue: [],
      upcoming: []
    };
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.calculateTaskCounts = this.calculateTaskCounts.bind(this);
    this.getUpcomingTasks = this.getUpcomingTasks.bind(this);
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
          this.getUpcomingTasks();
        });
      })
      .catch(error => {
        console.error('Error fetching tasks: ', error);
      });
  }

  getUpcomingTasks() {
    const { tasks } = this.state;
    let upcoming = [];
    let pastDue = [];
  
    tasks.forEach(task => {
      // Parse task due date and set it to the end of the day
      let dueDate = new Date(task.dueDate);
      dueDate.setHours(23, 59, 59, 999);
    
      // Get the current date and set it to the start of the day
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
    
      // Calculate the date 5 days from now
      let fiveDaysFromNow = new Date(currentDate);
      fiveDaysFromNow.setDate(currentDate.getDate() + 5);
    
      // Check if the task is past due or upcoming
      if (dueDate < currentDate && task.status != "DONE") {
        pastDue.push(task);
      } else if (dueDate >= currentDate && dueDate <= fiveDaysFromNow && task.status != "DONE") {
        upcoming.push(task);
      }
    });
    
  
  
    this.setState({ pastDue, upcoming });
 }

  refreshList() {
    const { userId } = this.context;
    this.retrieveTasks(userId);
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
    const { ipCount, doneCount, toDoCount, upcoming, pastDue } = this.state;
    const { username, logoutUser } = this.context;
    const columnStyle = {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      backgroundColor: "#FAA0A0"
    };

    return (
      <Container className="main-container pb-5">
        <Row className="justify-content-center">
          <Col md={9} className="rounded-pill p-3 text-center mb-3">
            <h1>Welcome to your Task Center, {username}</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={3} className="rounded-pill p-3 text-center mb-3 mx-2" style={{ ...columnStyle, backgroundColor: "#FAB2B2" }}>
            <h2>To Do</h2>
            <h5>{toDoCount}</h5>
          </Col>

          <Col md={3} className="rounded-pill p-3 text-center mb-3 mx-2" style={{ ...columnStyle, backgroundColor: "#FAE8B2" }}>
            <h2>In Progress</h2>
            <h5>{ipCount}</h5>
          </Col>

          <Col md={3} className="rounded-pill p-3 text-center mb-3 mx-2" style={{ ...columnStyle, backgroundColor: "#D6FAB2" }}>
            <h2>Done</h2>
            <h5>{doneCount}</h5>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={9} className="rounded-pill p-3 text-center mb-3 mx-2">
            <h1>Action Center</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {upcoming && upcoming.length > 0 && (
            <>
              <h3 className="text-center w-100">Upcoming Tasks</h3>
              <br/>
              {upcoming.map((task, index) => (
                <Col md={4} key={index} className="mb-3">
                  <Card key={index} className="mb-3">
                    <Card.Body>
                      <Card.Title className="mb-2"> {task.title} </Card.Title>
                      <Card.Text className="mb-2"> <strong>Due Date: </strong> {new Date(task.dueDate).toLocaleDateString('en-US', {timeZone: 'UTC'})} </Card.Text>
                      <Button variant='secondary' href={"/task/" + task.id}>
                        View Task
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </>
          )}
        </Row>
        <Row className="justify-content-center">
          {pastDue && pastDue.length > 0 && (
            <>
              <h3 className="text-center w-100">Past Due Tasks</h3>
              {pastDue.map((task, index) => (
                <Col md={4} key={index} className="mb-3">
                  <Card key={index} className="mb-3">
                    <Card.Body>
                      <Card.Title className="mb-2">{task.title} </Card.Title>
                      <Card.Text className="mb-2"> <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString('en-US', {timeZone: 'UTC'})} </Card.Text>
                      <Button variant='danger' href={"/task/" + task.id}>
                        View Task
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </>
          )}
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
