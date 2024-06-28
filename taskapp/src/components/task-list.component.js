import React, { Component } from "react";
import TaskDataService from "../task.service";
import Button from 'react-bootstrap/Button';
import '../global.css';
import { UserContext } from '../UserContext'; // Import UserContext

export default class TasksList extends Component {
  static contextType = UserContext; // Set contextType to UserContext

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      currentTask: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    const { userId } = this.context; // Access userId from context
    this.retrieveTasks(userId);
  }

  retrieveTasks(userId) {
    TaskDataService.getAll(userId) // Pass userId to getAll method
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
    const { userId } = this.context; // Access userId from context
    this.retrieveTasks(userId);
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

  renderPriorityColor = (priority) => {
    let color;
    if (priority === 'HIGH') {
      color = '#C9CC3F';
    } else if (priority === 'MEDIUM') {
      color = '#F28C28';
    } else if (priority === 'LOW') {
      color = '#93C572';
    }
    return <span style={{ color }}>{priority}</span>;
};
  
renderStatusColor = (status) => {
    let color;
    if (status === 'DONE') {
      color = '#93C572';
    } else if (status === 'IN PROGRESS') {
      color = '#F28C28';
    } else if (status === 'TO DO') {
      color = '#CD5C5C';
    }
    return <span style={{ color  }}>{status}</span>;
};

  render() {
    const { tasks, currentTask, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          < br/>
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
              < br/>
              <h4>{currentTask.title}</h4>
              <div>
                {currentTask.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTask && this.renderStatusColor(currentTask.status)}
              </div>
              <div>
                <label>
                  <strong>Due Date:</strong>
                </label>{" "}
                {currentTask && currentTask.dueDate}
              </div>
              <div>
                <label>
                  <strong>Priority: </strong>
                </label>{" "}
                {currentTask && this.renderPriorityColor(currentTask.priority)}
              </div>
              <br/>
              <Button variant='secondary' href={"/task/" + currentTask.id}>
                Edit Task
              </Button>
            </div>
          ) : (
            <div>
              <br />
            </div>
          )}
        </div>
      </div>
    );
  }
}
