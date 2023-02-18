import React from 'react';
import {useSelector} from 'react-redux';
import store from '../../redux/store';
import {assignmentDataAdd, studentsDataUpdater} from '../../redux/Init/init.actions';
import {useNavigate} from 'react-router-dom';
import {StyledFormControlLabel} from '../../Components/modifiedComponents/StyledFormControlLabel';
import {FormControl, Radio, RadioGroup} from '@mui/material';

export const NewAssignment = () => {
	const navigate = useNavigate();
	const [pageState, setPageState] = React.useState({
		assignment_code: '',
		Week_number: 0,
		Day_number: 0,
		sequence_number: 0,
		project: false,
		project_name: '',
		description: '',
		override: false
	});
	const assignmentsData = useSelector((state) => state.assignmentsData);
	const studentsData = useSelector((state) => state.studentsData);
	const courseValues = Object.values(assignmentsData);

	const handleAddAssignment = event => {
		event.preventDefault();
		delete pageState.override;
		for (const [key, value] of Object.entries(pageState)) {
			pageState[key] = value === 0 ? '' : value.toString();
		}
		const assignment_code = pageState.assignment_code;
		store.dispatch(assignmentDataAdd({[assignment_code]: pageState}));
		for (const [key, value] of Object.entries(studentsData)) {
			value.assignments[assignment_code] = {difficulty: 'NA', funFactor: 'NA'};
			store.dispatch(studentsDataUpdater({[key]: value}));
		}
		navigate(`/assignment/${assignment_code}`);
	};

	/* This 'handleChange' generates the assignment code
	 * and does this with various options.
	 * There is the option to determine the name (code) of the assignment bij hand, but with the option of a project
	 * but without the week, dat and project name.
	 * And if those fields are filled, they have to be cleared and no longer available.
	 * Al these states are also used to show or hide or enable or disable fields
	 */
	const handleChange = (event) => {
		const week = event.Week_number ?? pageState.Week_number;
		const day = event.Day_number ?? pageState.Day_number;
		const projectName = event.project_name ?? pageState.project_name;
		const assignmentCode = event.assignment_code ?? pageState.assignment_code;
		const override = event.override ?? pageState.override;
		const project = event.project ?? pageState.project;
		const description = event.description ?? pageState.description

		function getSequence() {
			const newSequence = courseValues
			.filter((entry) => entry.Week_number === (week === 0 ? '' : week))
			.filter((entry) => entry.Day_number === (day === 0 ? '' : day))
			.filter((entry) => entry.project === project.toString())
			.filter((entry) => entry.project_name.toLowerCase() === projectName.toLowerCase())
			.filter((entry) => {
				if (override) {
					return entry.assignment_code.trim().toLowerCase() === assignmentCode.toLowerCase();
				}
				if(entry.Week_number===''){
					return false;
				}
				return assignmentCode !== '';
			})
			.reduce((acc, entry) => {
				if (entry.sequence_number === '') {
					acc = entry.sequence_number;
				} else if (entry.sequence_number > acc) {
					acc = entry.sequence_number;
				}
				return acc;
			}, 0);
			return (newSequence === 0? newSequence: (newSequence - 0) + 1);
		}

		let sequence = getSequence();
		let assCode = '';
		if (week > 0) {
			assCode = `W${week}`;
		}
		if (day > 0) {
			assCode += `D${day}`;
		}
		if (sequence > 0) {
			assCode += `-${sequence}`;
		}
		if (projectName !== '') {
			assCode += `- Project - ${projectName}`;
		}
		if (override) {
			if (sequence === 0) {
				sequence = '';
			} else if(sequence !==''){
				sequence = `-${sequence}`;
			}
			assCode = `${assignmentCode}${sequence}`;
		}
		setPageState({
			...pageState,
			Day_number: day,
			Week_number: week,
			assignment_code: assCode,
			sequence_number: sequence,
			override: override,
			project: project,
			project_name:projectName,
			description:description
		});
	};
	return (<div className="pageContainer">
		<div className={'widgetTitle pageTitle'}>New Assignment</div>
		<form className={'flexContainer widgetContainer'} id={'create-course-form'}>
			<div className="assignmentShow">
				<div className="assignmentShowBottom">
					<div className="assignmentShowInfo">
						<label className="assignmentShowTitle">Override Course name by hand:</label>
						<FormControl>
							<RadioGroup
								row
								aria-labelledby="override-radio-buttons-group-label"
								// defaultValue={pageState.override}
								value={pageState.override}
								name="override-radio-buttons-group"
								className="assignmentShowInfoTitle radio"
							>
								<StyledFormControlLabel value={'true'} control={<Radio/>} label="Yes"
								                        onChange={() => handleChange({
									                        override: true,
									                        Week_number: 0,
									                        Day_number: 0,
									                        sequence: 0,
									                        project_name: ''
								                        })}/>
								<StyledFormControlLabel value={'false'} control={<Radio/>} label="No"
								                        onChange={() => handleChange({
									                        override: false,
									                        assignment_code: ''
								                        })}/>
							</RadioGroup>
						</FormControl>
					</div>
					{pageState.override ? <div className="assignmentShowInfo">
						<label className="assignmentShowTitle">Code:</label>
						<input className="InputForm"
						       type={'text'}
						       // defaultValue={pageState.assignment_code}
						       value={pageState.assignment_code}
						       onChange={(e) => handleChange({assignment_code: e.target.value.trim()})}
						/>
					</div> : <div className="assignmentShowInfo">
						<span className="assignmentShowTitle">Code:</span>
						<span className="assignmentShowInfoTitle">{pageState.assignment_code}</span>
					</div>}
					{!pageState.override ? <div className="assignmentShowInfo">
						<label className="assignmentShowTitle">Week Number:</label>
						<input className="InputForm"
						       type={'number'}
							// placeholder={'Course week'}
							   value={pageState.Week_number === 0 ? '' : pageState.Week_number}
							   disabled={pageState.override}
							   onChange={(e) => handleChange({Week_number: e.target.value})}
						/>
					</div> : null}
					{!pageState.override ? <div className="assignmentShowInfo">
						<label className="assignmentShowTitle">Day Number:</label>
						<input
							className="InputForm"
							type={'number'}
							// placeholder={'Course day number'}
							value={pageState.Day_number === 0 ? '' : pageState.Day_number}
							disabled={pageState.Week_number === 0}
							onChange={(e) => handleChange({Day_number: e.target.value})}
						/>
					</div> : null}
					<div className="assignmentShowInfo">
						<label className="assignmentShowTitle">Project:</label>
						<FormControl>
							<RadioGroup
								row
								aria-labelledby="project-radio-buttons-group-label"
								// defaultValue={pageState.project}
								value={pageState.project}
								name="project-radio-buttons-group"
								className="assignmentShowInfoTitle radio"
							>
								<StyledFormControlLabel value={'true'} control={<Radio/>} label="Yes"
								                        onChange={() => handleChange({project: true})}/>
								<StyledFormControlLabel value={'false'} control={<Radio/>} label="No"
								                        onChange={() => handleChange({
									                        project: false,
									                        project_name: ''
								                        })}/>
							</RadioGroup>
						</FormControl>
					</div>
					{pageState.project && !pageState.override ? <div className="assignmentShowInfo">
						<label className="assignmentShowTitle">Project Name:</label>
						<input
							className="InputForm"
							type={'text'}
							// placeholder={'Project name'}
							value={pageState.project_name}
							onChange={(e) => handleChange({project_name: e.target.value})}
						/></div> : null}
					{pageState.sequence_number > 0 ? <div className="assignmentShowInfo">
						<span className="assignmentShowTitle">Sequence Number:</span>
						<span className="assignmentShowInfoTitle">{pageState.sequence_number}</span>
					</div> : null}
				</div>
			</div>

			<div className="assignmentShowRight">
				<div className="assignmentShowInfo">
					<span className="assignmentShowTitle">Assignment description</span>
					<textarea
						placeholder={'Course description'}
						onChange={(e) => handleChange({description: e.target.value})}
						className="assignmentUpdateInput"
					/>
				</div>
				<button
					disabled={pageState.assignment_code===''}
					className={`rootButton ${pageState.assignment_code===''?'disabled':''}`}
					onClick={handleAddAssignment}
				>
					Add assignment
				</button>
			</div>
		</form>
	</div>);
};