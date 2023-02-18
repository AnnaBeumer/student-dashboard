import React from 'react';
import {useSelector} from 'react-redux';
import store from '../../../redux/store';
import {selectAssignments} from '../../../redux/Selector/selector.actions';
import {Link} from 'react-router-dom';
import {StyledDataGrid} from '../../../Components/modifiedComponents/StyledDataGrid';
import {dataSelectorFilter} from '../../../utils';
import {studentsDataUpdater} from '../../../redux/Init/init.actions';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

export const AssignmentsResult = ({studentId, studentsData}) => {
	const filteredStudentData = dataSelectorFilter(studentsData, [studentId]);
	const studentData = Object.values(filteredStudentData)[0];
	const assignmentsData = useSelector((state) => state.assignmentsData);
	const assignmentList = Object.keys(assignmentsData).map((key) => {
		return {
			id: assignmentsData[key].assignment_code,
			key: assignmentsData[key].assignment_code,
			assignment_code: assignmentsData[key].assignment_code,
			project_name: assignmentsData[key].project_name,
			assignment_description: assignmentsData[key].description,
			funFactor: studentData.assignments[key].funFactor,
			difficulty: studentData.assignments[key].difficulty,
			Week_number: assignmentsData[key].Week_number,
			Day_number: assignmentsData[key].Day_number,
			sequence_number: assignmentsData[key].sequence_number
		};
	});
	const selectionModelState = useSelector((state) => {
		return state.assignmentSelect;
	});
	const handleSelection = (newSelectionModel) => {
		store.dispatch(selectAssignments(newSelectionModel));
	};
	const handleChange = (assignmentId, field, value) => {
		studentData.assignments[assignmentId][field] = isNaN(value - 0) ? value : value - 0;
		store.dispatch(studentsDataUpdater({
			[studentId]: studentData
		}));
	};
	const columns = [{field: 'assignment_code', headerName: 'Assignment Code', width: 200}, {
		field: 'Week_number', headerName: 'Week Number', width: 100
	}, {field: 'Day_number', headerName: 'Day Number', width: 100}, {
		field: 'sequence_number', headerName: 'Sequence Number', width: 100
	}, {
		field: 'project_name', headerName: 'Project Name', width: 200
	}, {
		field: 'assignment_description', headerName: 'Project Description', width: 200
	}, {
		field: 'funFactor', renderHeader: () => {
			return (<div><ModeEditOutlinedIcon fontSize={'small'}/>{'FunFactor'}</div>);
		}, width: 100, editable: true, renderCell: (params) => {
			return (<div><ModeEditOutlinedIcon fontSize={'small'}/> {params.row.funFactor}</div>);
		}
	}, {
		field: 'difficulty', renderHeader: () => {
			return (<div><ModeEditOutlinedIcon fontSize={'small'}/>{'Difficulty'}</div>);
		}, width: 100, editable: true, renderCell: (params) => {
			return (<div><ModeEditOutlinedIcon fontSize={'small'}/>{params.row.difficulty}</div>);
		}
	}, {
		field: 'action', headerName: 'Action', width: 60, renderCell: (params) => {
			return (<Link to={'/assignment/' + params.row.id}>
				<button className="rootButton">View</button>
			</Link>);
		}
	}];

	return (<div className={'widgetContainer'}>
		<h3 className="widgetLgTitle">Assignment List Results
			for {studentData.first_name} {studentData.last_name}</h3>
		<StyledDataGrid
			autoHeight={true}
			rows={assignmentList}
			disableSelectionOnClick
			columns={columns}
			checkboxSelection={true}
			onSelectionModelChange={(ids) => {
				handleSelection(ids);
			}}
			selectionModel={selectionModelState}
			onCellEditStop={(params, event) => {
				if (params.hasFocus) {
					event.defaultMuiPrevented = false;
					handleChange(params.id, params.field, event.target.value);
				} else {
					event.defaultMuiPrevented = true;
				}
			}}
		/>
	</div>);
};
