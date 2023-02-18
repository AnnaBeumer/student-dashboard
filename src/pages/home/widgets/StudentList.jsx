import React from 'react';
import {Link} from 'react-router-dom';
import store from '../../../redux/store';
import {selectStudents} from '../../../redux/Selector/selector.actions';
import {useSelector} from 'react-redux';
import {StyledDataGrid} from '../../../Components/modifiedComponents/StyledDataGrid';

export const StudentList = ({studentsData}) => {
	const studentList = Object.keys(studentsData).map((key) => {
		return {
			id: studentsData[key].student_number,
			key: studentsData[key].student_number,
			first_name: studentsData[key].first_name,
			last_name: studentsData[key].last_name,
			avatar: studentsData[key].avatar
		};
	});
	const selectionModelState = useSelector((state) => {
		return state.studentSelect;
	});
	const handleSelection = (newSelectionModel) => {
		store.dispatch(selectStudents(newSelectionModel));
	};
	const columns = [{
		BaseTooltip: 'first_name', field: 'first_name', headerName: 'First Name', width: 200, renderCell: (params) => {
			return (<div className="studentsStudent">
				<img className="studentsStudentImg" src={params.row.avatar} alt=""/>
				{params.row.first_name}
			</div>);
		}
	}, {field: 'last_name', headerName: 'Last Name', width: 200}, {
		field: 'action', headerName: 'Action', width: 60, renderCell: (params) => {
			return (<Link to={'/student/' + params.row.id}>
				<button className="rootButton">View</button>
			</Link>);
		}
	}];

	return (
		<div>
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
			/>
		</div>
	);
};
