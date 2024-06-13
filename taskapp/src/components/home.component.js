import React, { Component } from "react";
import TaskDataService from "../task.service";
import "../global.css"



export default class Home extends Component {

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
        this.retrieveTasks();
      }

    retrieveTasks() {
        TaskDataService.getAll()
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
        this.retrieveTasks();
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
        return (
            <div className="home">
              <h1>Task Dashboard</h1>
              <br/>
              <div className="status-counts">
                <div className="status-count">
                  <h2>To Do: </h2>
                  <h5>{toDoCount}</h5>
                </div>
                <div className="status-count">
                  <h2>In Progress: </h2>
                  <h5>{ipCount}</h5>
                </div>
                <div className="status-count">
                  <h2>Done: </h2>
                  <h5>{doneCount}</h5>
                </div>
              </div>
              </div>
          );
        }
      }