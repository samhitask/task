import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';

import CreateTask from './components/create-task.component';
import Task from './components/task.component';
import TaskList from './components/task-list.component';
import Home from './components/home.component';
import Login from './components/login.component';
import Sidenav from './layout/Sidenav';
import SignUp from './components/sign-up.component';
import { UserProvider } from './UserContext';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <div className="app-container">
      <UserProvider>
        <Sidenav />
        <div className="main-content">
          <div className="container mt-3">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/add-task" element={<CreateTask />} />
                <Route path="/task/:id" element={<Task />} />
              </Route>
            </Routes>
          </div>
        </div>
      </UserProvider>
    </div>
  );
};

export default App;
