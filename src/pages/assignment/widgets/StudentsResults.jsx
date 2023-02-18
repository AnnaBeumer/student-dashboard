import React from 'react';
import {Link} from 'react-router-dom';
import store from '../../../redux/store';
import {selectStudents} from '../../../redux/Selector/selector.actions';
import {useSelector} from 'react-redux';
import {StyledDataGrid} from '../../../Components/modifiedComponents/StyledDataGrid';
import {studentsDataUpdater} from '../../../redux/Init/init.actions';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

export const StudentsResults = (props) => {
	const studentList = Object.keys(props.studentsData).map((key) => {
		return {
			id: props.studentsData[key].student_number,
			key: props.studentsData[key].student_number,
			first_name: props.studentsData[key].first_name,
			last_name: props.studentsData[key].last_name,
			email: props.studentsData[key].email,
			phone: props.studentsData[key].phone,
			birthday: props.studentsData[key].birthday,
			avatar: props.studentsData[key].avatar,
			funFactor: props.studentsData[key].assignments[props.assignmentId].funFactor,
			difficulty: props.studentsData[key].assignments[props.assignmentId].difficulty
		};
	});
	const selectionModelState = useSelector((state) => {
		return state.studentSelect;
	});
	const handleSelection = (newSelectionModel) => {
		store.dispatch(selectStudents(newSelectionModel));
	};
	const handleChange = (studentId, field, value) => {
		props.studentsData[studentId].assignments[props.assignmentId][field] = isNaN(value - 0) ? value : value - 0;
		store.dispatch(studentsDataUpdater({
			[studentId]: props.studentsData[studentId]
		}));
	};
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
	}, {
		field: 'funFactor', renderHeader: () => {
			return (<div><ModeEditOutlinedIcon fontSize={'small'}/>{'FunFactor'}</div>);
		}, width: 100, editable: true,
		renderCell: (params) => {
			return (<div><ModeEditOutlinedIcon fontSize={'small'}/>
				{params.row.funFactor}</div>);
		}
	}, {
		field: 'difficulty', renderHeader: () => {
			return (<div><ModeEditOutlinedIcon fontSize={'small'}/>{'Difficulty'}</div>);
		}, width: 100, editable: true,
		renderCell: (params) => {
			return (<div><ModeEditOutlinedIcon fontSize={'small'}/>
				{params.row.difficulty}</div>);
		}
	}, {
		field: 'action', headerName: 'Action', width: 60, renderCell: (params) => {
			return (<Link to={'/student/' + params.row.id}>
				<button className="rootButton">View</button>
			</Link>);
		}
	}];

	return (<div className={'widgetContainer'}>
		<h3 className={'widgetTitle'}>Student List</h3>
		<StyledDataGrid
			autoHeight={true}
			rows={studentList}
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
