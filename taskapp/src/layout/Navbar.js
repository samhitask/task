import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
           <a href="/tasks" className="navbar-brand">
               Task Manager
           </a>
           <div className="navbar-nav mr-auto">
               <li className="nav-item">
               <Link to={"/tasks"} className="nav-link">
                   Tasks
               </Link>
               </li>
               <li className="nav-item">
               <Link to={"/add-tasks"} className="nav-link">
                   Add Task
               </Link>
               </li>
           </div>
       </nav>
   </div>
    )

}