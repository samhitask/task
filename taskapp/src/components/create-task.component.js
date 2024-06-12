import React, { Component } from "react";
import TaskDataService from "../task.service";

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
      published: false,

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

  onChangeDueDate(e) {
    this.setState({
      dueDate: e.target.value
    });
  }

  saveTask() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      status: this.state.status,
      dueDate: this.state.dueDate,
      priority: this.state.priority
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
      dueDate: "",
      status: "",
      priority: "",

      submitted: false
    });
  }

  render() {
          return (
            <div className="submit-form">
              {this.state.submitted ? (
                <div>
                  <h4>Task added successfully!</h4>
                  <button className="btn btn-success" onClick={this.newTutorial}>
                    Add
                  </button>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      required
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                      name="title"
                    />
                  </div>
      
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      required
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      name="description"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <input
                      type="text"
                      className="form-control"
                      id="status"
                      required
                      value={this.state.status}
                      onChange={this.onChangeStatus}
                      name="status"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="dueDate"
                      required
                      value={this.state.dueDate}
                      onChange={this.onChangeDueDate}
                      name="dueDate"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <input
                      type="text"
                      className="form-control"
                      id="priority"
                      required
                      value={this.state.priority}
                      onChange={this.onChangePriority}
                      name="priority"
                    />
                  </div>
      
                  <button onClick={this.saveTask} className="btn btn-success">
                    Submit
                  </button>
                </div>
              )}
            </div>
          );
        }
      }