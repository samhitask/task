import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './global.css'

import CreateTask from "./components/create-task.component";
import Task from "./components/task.component";
import TaskList from "./components/task-list.component";
import Home from "./components/home.component";
import Sidenav from "./layout/Sidenav";

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Sidenav />
        <div className="main-content">
          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/tasks" element={<TaskList/>} />
              <Route path="/add-task" element={<CreateTask/>} />
              <Route path="/task/:id" element={<Task/>} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }
}

export default App;