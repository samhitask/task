import React, { Component } from "react";
import TaskDataService from "../task.service";
import { Link } from "react-router-dom";

export default class TasksList extends Component {
  constructor(props) {
    super(props);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.state = {
        tasks: [],
        currentTask: null,
        currentIndex: -1,
      };
  }

  componentDidMount() {
    this.retrieveTasks();
  }


  retrieveTasks() {
    TaskDataService.getAll()
      .then(response => {
        this.setState({
          tasks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTasks();
    this.setState({
      currentTask: null,
      currentIndex: -1
    });
  }

  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: index
    });
  }

  render() {
    const { tasks, currentTask, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
    
          </div>
        </div>
        <div className="col-md-6">
          <h4>Task Center</h4>

          <ul className="list-group">
            {tasks &&
              tasks.map((task, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTask(task, index)}
                  key={index}
                >
                  {task.title}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentTask ? (
            <div>
              <h4>task</h4>
              <div>
                <label>
                  <strong>Title: </strong>
                </label>{" "}
                {currentTask.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTask.description}
              </div>
              <div>
                <label>
                  <strong>State:</strong>
                </label>{" "}
                {currentTask.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tasks/" + currentTask.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>View active tasks here! </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}