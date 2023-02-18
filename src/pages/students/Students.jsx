import React from 'react';
import './css/students.css';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {averageAssignmentsCalculator} from '../../utils';
import {StyledDataGrid} from '../../Components/modifiedComponents/StyledDataGrid';

export const Students = () => {
	const navigate = useNavigate();
	const studentsData = useSelector((state) => state.studentsData);
	const assignmentsData = useSelector((state) => state.assignmentsData);
	const averageData = averageAssignmentsCalculator(assignmentsData, studentsData);
	const studentList = Object.keys(studentsData).map((key) => {
		return {
			id: studentsData[key].student_number,
			first_name: studentsData[key].first_name,
			last_name: studentsData[key].last_name,
			email: studentsData[key].email,
			phone: studentsData[key].phone,
			avatar: studentsData[key].avatar,
			birthday: studentsData[key].birthday,
			funFactor: averageData.students[key].funFactor,
			difficulty: averageData.students[key].difficulty
		};
	});

	const columns = [{
		field: 'first_name', headerName: 'First Name', width: 200, renderCell: (params) => {
			return (<div className="studentsStudent">
				<img className="studentsStudentImg" src={params.row.avatar} alt=""/>
				{params.row.first_name}
			</div>);
		}
	}, {field: 'last_name', headerName: 'Last Name', width: 200}, {
		field: 'email', headerName: 'Email', width: 200
	}, {field: 'phone', headerName: 'Phone', width: 180}, {
		field: 'birthday', headerName: 'Birthday', width: 100
	}, {field: 'funFactor', headerName: 'Average FunFactor', width: 90}, {
		field: 'difficulty', headerName: 'Average Difficulty', width: 90
	}, {
		field: 'action', headerName: 'Action', width: 60, renderCell: (params) => {
			return (<Link to={'/student/' + params.row.id}>
				<button className="rootButton">View</button>
			</Link>);
		}
	}];

	const handleNewStudent = () => {
		navigate(`/student/new`);
	};

	return (<div className="pageContainer">
		<div className={'widgetTitle pageTitle'}>Students</div>

		<div className="widgetContainer">
			<div className={'widgetTitle'}>
				<button className={'rootButton'} onClick={handleNewStudent}>Add new Student</button>
			</div>
			<StyledDataGrid
				autoHeight={true}
				rows={studentList}
				disableSelectionOnClick={true}
				columns={columns}

			/>
		</div>
	</div>);
};
