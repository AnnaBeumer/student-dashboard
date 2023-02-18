import React from 'react';
import './app.css';
import {TopBar} from './Components/sections/topbar/TopBar';
import {Home} from './pages/home/Home';
import {Sidebar} from './Components/sections/sidebar/Sidebar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Students} from './pages/students/Students';
import {Student} from './pages/student/Student';
import {Assignments} from './pages/assignments/Assignments';
import {Assignment} from './pages/assignment/Assignment';
import {NewAssignment} from './pages/assignment/NewAssignment';
import {Statistics} from './pages/Statistics/Statistics';
import {NewStudent} from './pages/student/NewStudent';
import {Settings} from './pages/settings/Settings';

function App() {
	return (<Router>
		<TopBar/>
		<div className="flexContainer">
			<Sidebar/>
			<Routes>
				<Route path="/assignment/:assignmentid" element={<Assignment/>}/>
				<Route path="/assignment/new" element={<NewAssignment/>}/>
				<Route path="/assignments" element={<Assignments/>}/>
				<Route path="/student/:studentid" element={<Student/>}/>
				<Route path="/student/new" element={<NewStudent/>}/>
				<Route path="/students" element={<Students/>}/>
				<Route path="/statistics" element={<Statistics/>}/>
				<Route path="/settings" element={<Settings/>}/>
				<Route path="/" element={<Home/>}/>
			</Routes>
		</div>
	</Router>);
}

export default App;
