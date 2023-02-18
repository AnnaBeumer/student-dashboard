import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {averageAssignmentsCalculator} from '../../utils';
import {StyledDataGrid} from '../../Components/modifiedComponents/StyledDataGrid';

export const Assignments = () => {
	const navigate = useNavigate();
	const studentsData = useSelector((state) => state.studentsData);
	const assignmentsData = useSelector((state) => state.assignmentsData);
	const averageData = averageAssignmentsCalculator(assignmentsData, studentsData);

	const assignmentList = Object.keys(assignmentsData).map((key) => {
		return {
			id: assignmentsData[key].assignment_code,
			assignment_code: assignmentsData[key].assignment_code,
			Week_number: assignmentsData[key].Week_number,
			Day_number: assignmentsData[key].Day_number,
			sequence_number: assignmentsData[key].sequence_number,
			project: assignmentsData[key].project,
			project_name: assignmentsData[key].project_name,
			funFactor: averageData.assignments[key].funFactor,
			difficulty: averageData.assignments[key].difficulty
		};
	});

	const columns = [{field: 'assignment_code', headerName: 'Assignment Code', width: 200}, {
		field: 'Week_number', headerName: 'Week Number', width: 100
	}, {field: 'Day_number', headerName: 'Day Number', width: 100}, {
		field: 'sequence_number', headerName: 'Sequence Number', width: 100
	}, {field: 'project', headerName: 'Project', width: 80}, {
		field: 'project_name', headerName: 'Project Name', width: 200
	}, {field: 'funFactor', headerName: 'Average FunFactor', width: 90}, {
		field: 'difficulty', headerName: 'Average Difficulty', width: 90
	}, {
		field: 'action', headerName: 'Action', width: 60, renderCell: (params) => {
			return (<Link to={'/assignment/' + params.row.id}>
				<button className="rootButton">View</button>
			</Link>);
		}
	}];

	const handleNewAssignment = () => {
		navigate(`/assignment/new`);
	};

	return (<div className="pageContainer">
		<div className={'widgetTitle pageTitle'}>Assignments</div>
		<div className="widgetContainer">
			<div className={'widgetTitle'}>
				<button className={'rootButton'} onClick={handleNewAssignment}>Add new Assignment</button>
			</div>
			<StyledDataGrid
				autoHeight={true}
				rows={assignmentList}
				disableSelectionOnClick={true}
				columns={columns}
			/>
		</div>
	</div>);
};

