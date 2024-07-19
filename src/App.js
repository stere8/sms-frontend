// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Attendance from './components/Attendance';
import Classes from './components/Classes';
import Enrollments from './components/Enrollments';
import Lessons from './components/Lessons';
import Marks from './components/Marks';
import Staff from './components/Staff';
import Students from './components/Students';
import Timetable from './components/Timetable';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/attendance" component={Attendance} />
          <Route path="/classes" component={Classes} />
          <Route path="/enrollments" component={Enrollments} />
          <Route path="/lessons" component={Lessons} />
          <Route path="/marks" component={Marks} />
          <Route path="/staff" component={Staff} />
          <Route path="/students" component={Students} />
          <Route path="/timetable" component={Timetable} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
