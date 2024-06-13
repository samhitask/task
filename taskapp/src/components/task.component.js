import React, { Component } from "react";
import TaskDataService from "../task.service";
import { withRouter } from '../common/with-router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        dueDate: "",
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
    this.setState({
      dueDate: date
    });
  };

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
            <h4>Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTask.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTask.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className='form-group'>
                <label htmlFor="status">Status</label>
                <br/>
                <select value={currentTask.status} onChange={this.onChangeStatus}>
                  {statuses.map((st) => (
                    <option key={st.value} value={st.value}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                      <label htmlFor="dueDate">Due Date</label>
                      <br/>
                      <DatePicker
                        selected={this.state.dueDate}
                        onChange={this.onChangeDueDate}
                        dateFormat="yyyy-MM-dd"
                      />
                    </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <br/>
                <select value={currentTask.priority} onChange={this.onChangePriority}>
                  {priorities.map((pr) => (
                    <option key={pr.value} value={pr.value}>
                      {pr.label}
                    </option>
                  ))}
                </select>
              </div>

  
            </form>

           
            <br/>

            <button variant='contained'
              onClick={this.deleteTask}
              >
            
              Delete
            </button>{' '}

            <button
              type="submit"
              onClick={this.updateTask}
              color='#7393B3'
            >
              Update
            </button>
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