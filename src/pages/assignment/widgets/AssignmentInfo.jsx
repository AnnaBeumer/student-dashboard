import React from 'react';
import {replaceWithBr} from '../../../utils';
import store from '../../../redux/store';
import {assignmentDataUpdater, assignmentDelete} from '../../../redux/Init/init.actions';
import {useNavigate} from 'react-router-dom';

export const AssignmentInfo = ({assignmentId, assignmentsData}) => {
	const navigate = useNavigate();
	const currentAssignmentData = assignmentsData[assignmentId];
	const handleUpdate = (event) => {
		event.preventDefault();
		store.dispatch(assignmentDataUpdater({[assignmentId]: pageState}));
		setPageState({...pageState});
		setEditToggle(!editToggle);
	};
	const handleDelete = (event) => {
		event.preventDefault();
		if (window.confirm('Are you sure you wish to delete this Assignment?')) {
			store.dispatch(assignmentDelete(assignmentId));
			navigate('/assignments');
		}
	};
	const [pageState, setPageState] = React.useState(currentAssignmentData);
	const [editToggle, setEditToggle] = React.useState(true);
	return (<div className={'flexContainer widgetContainer'}>
		<div className="assignmentShow">
			<div className="assignmentShowInfo">
						<span
							className="assignmentShowName">{currentAssignmentData.assignment_code}</span>
			</div>
			<div className="assignmentShowBottom">
				<span className="assignmentShowTitle">Assignment details</span>
				<div className="assignmentShowInfo">
					<span className="assignmentShowTitle">Code:</span><span
					className="assignmentShowInfoTitle">{currentAssignmentData.assignment_code}</span>
				</div>
				<div className="assignmentShowInfo">
					<span className="assignmentShowTitle">Week Number:</span><span
					className="assignmentShowInfoTitle">{currentAssignmentData.Week_number}</span>
				</div>
				<div className="assignmentShowInfo">
					<span className="assignmentShowTitle">Day Number:</span><span
					className="assignmentShowInfoTitle">{currentAssignmentData.Day_number}</span>
				</div>
				{currentAssignmentData.project_name ? null : <div className="assignmentShowInfo">
					<span className="assignmentShowTitle">Sequence Number:</span><span
					className="assignmentShowInfoTitle">{currentAssignmentData.sequence_number}</span>
				</div>}
				{currentAssignmentData.project_name ? <div className="assignmentShowInfo">
					<span className="assignmentShowTitle">Project:</span><span
					className="assignmentShowInfoTitle">{currentAssignmentData.project_name}</span>
				</div> : null}
			</div>
		</div>

		<div className="assignmentShowRight">
			<div className="assignmentShowInfo">
				<span className="assignmentShowTitle">Assignment description</span>
				{editToggle ? <span className="assignmentDescription"
				                    dangerouslySetInnerHTML={{__html: replaceWithBr(pageState.description)}}/> :
					<textarea
						defaultValue={pageState.description}
						onChange={(e) => setPageState({...pageState, description: e.target.value})}
						className="assignmentUpdateInput"
					/>}
			</div>
			<div>
				<div className="flexContainer">
					{editToggle ? <button
						className="rootButton"
						onClick={() => setEditToggle(!editToggle)}
					>
						Edit
					</button> : <button
						className="rootButton"
						onClick={handleUpdate}
					>
						Update
					</button>
					}
					<div className={'spacer'}></div>
					<button
						className="rootDeleteButton"
						onClick={handleDelete}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	</div>);
};