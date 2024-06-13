import React, { Component } from "react";
import TaskDataService from "../task.service";
import { withRouter } from './with-router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form } from 'react-bootstrap';

class Task extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.getTask = this.getTask.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      currentTask: {
        id: null,
        title: "",
        description: "",
        status: "",
        dueDate: Date(),
        priority: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTask(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        description: description
      }
    }));
  }
  onChangeStatus(e) {
    const status = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        status: status
      }
    }));
  }

  onChangePriority(e) {
    const priority = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        priority: priority
      }
    }));
  }

  onChangeDueDate = (date) => {
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        dueDate: date
      }
    }));
  }
  getTask(id) {
    TaskDataService.get(id)
      .then(response => {
        this.setState({
          currentTask: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTask.id,
      title: this.state.currentTask.title,
      description: this.state.currentTask.description,
      published: status
    };

    TaskDataService.update(this.state.currentTask.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTask: {
            ...prevState.currentTask,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTask() {
    TaskDataService.update(
      this.state.currentTask.id,
      this.state.currentTask
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The task was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {    
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/tasks');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTask } = this.state;
    let statuses = [
      { label: 'TO DO', value: 'TO DO'},
      { label: 'IN PROGRESS', value: 'IN PROGRESS'},
      { label: 'DONE', value: 'DONE'}
    ]
    let priorities = [
      { label: 'LOW', value: 'LOW'},
      { label: 'MEDIUM', value: 'MEDIUM'},
      { label: 'HIGH', value: 'HIGH'}
    ]
    return (
      <div>
        {currentTask ? (
          <div className="edit-form">
            <h4>Edit Task: {currentTask.title}</h4>
            
            <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                value={currentTask.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                value={currentTask.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select value={currentTask.status} onChange={this.onChangeStatus}>
                    {statuses.map((st) => (
                      <option key={st.value} value={st.value}>
                        {st.label}
                      </option>
                    ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <br />
              <DatePicker
                selected={currentTask.dueDate}
                onChange={this.onChangeDueDate}
                dateFormat="yyyy-MM-dd"
              />
            </Form.Group>

            <Form.Group controlId="priority">
              <Form.Label>Priority</Form.Label>
              <Form.Select value={currentTask.priority} onChange={this.onChangePriority}>
                  {priorities.map((pr) => (
                    <option key={pr.value} value={pr.value}>
                      {pr.label}
                    </option>
                  ))}
                </Form.Select>
            </Form.Group>

          </Form>

           
            <br/>

            <Button
              variant='success'
              onClick={this.updateTask}
              
            >
              Update
            </Button>{' '}
            <Button variant='danger'
              onClick={this.deleteTask}
              >
            
              Delete
            </Button>

            <br />
              <p> {this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
           
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Task);