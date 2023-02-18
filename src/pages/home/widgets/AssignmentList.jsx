import React from 'react';
import {useSelector} from 'react-redux';
import store from '../../../redux/store';
import {selectAssignments} from '../../../redux/Selector/selector.actions';
import {Link} from 'react-router-dom';
import {StyledDataGrid} from '../../../Components/modifiedComponents/StyledDataGrid';

export const AssignmentList = ({assignmentsData}) => {
	// const assignmentData = useSelector((state) => state.assignmentsData);
	const assignmentList = Object.keys(assignmentsData).map((key) => {
		return {
			id: assignmentsData[key].assignment_code,
			key: assignmentsData[key].assignment_code,
			assignment_code: assignmentsData[key].assignment_code,
			project_name: assignmentsData[key].project_name
		};
	});
	const selectionModelState = useSelector((state) => {
		return state.assignmentSelect;
	});
	const handleSelection = (newSelectionModel) => {
		store.dispatch(selectAssignments(newSelectionModel));
	};
	const columns = [{
		field: 'assignment_code', headerName: 'Assignment Code', width: 200
	}, {field: 'project_name', headerName: 'Project Name', width: 200}, {
		field: 'action', headerName: 'Action', width: 60, renderCell: (params) => {
			return (<Link to={'/assignment/' + params.row.id}>
				<button className="rootButton">View</button>
			</Link>);
		}
	}];

	return (<div>
		<h3 className={'widgetTitle'}>Assignment List</h3>
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
		/>
	</div>);
};
