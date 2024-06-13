import React, { Component } from "react";
import TaskDataService from "../task.service";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../global.css"
import { Button, Form }  from 'react-bootstrap';

export default class AddTask extends Component {


  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      status: 'TO DO',
      dueDate: new Date(),
      priority: '',

      submitted: false

    };
    
  
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  } 
  
  onChangePriority(e) {
    this.setState({
      priority: e.target.value
    });
  }

  onChangeDueDate = (date) => {
    this.setState({
      dueDate: date
    });
  };

  saveTask() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      status: this.state.status,
      dueDate: this.state.dueDate,
      priority: this.state.priority,

      submitted: true
    };

    TaskDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          status: response.data.status,
          dueDate: response.data.dueDate,
          priority: response.data.priority,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTask() {
    this.setState({
      id: null,
      title: "",
      description: "",
      dueDate: Date,
      status: "",
      priority: "",

      submitted: false
    });
  }

  render() {

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
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <br />
            <h4>Task added successfully!</h4>
            <Button variant="primary" href="/add-tasks" className="success">
              Add more?
            </Button>
          </div>
        ) : (
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select onChange={this.onChangeStatus}>
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
              <br />
              <DatePicker
                selected={this.state.dueDate}
                onChange={this.onChangeDueDate}
                dateFormat="yyyy-MM-dd"
              />
            </Form.Group>

            <Form.Group controlId="priority">
              <Form.Label>Priority</Form.Label>
              <Form.Select onChange={this.onChangePriority}>
                <option value="">Select a priority</option>
                {priorities.map((pr) => (
                  <option key={pr.label} value={pr.value}>
                    {pr.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <br />
            <Button variant="primary" size="md" onClick={this.saveTask}>
              Submit
            </Button>
          </Form>
        )}
      </div>
    );
  }
}
