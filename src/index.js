import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import AdminState from './context/admin/AdminState';
import StudentState from './context/students/StudentState'

ReactDOM.render(
    <Router>
      <AdminState>
        <StudentState>
          <App />
        </StudentState>
      </AdminState>
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

