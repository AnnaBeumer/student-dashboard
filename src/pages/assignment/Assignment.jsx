import React from 'react';
import {useParams} from 'react-router-dom';
import './css/assignment.css';
import {Chart} from '../../Components/charts/chart/Chart';
import {useSelector} from 'react-redux';
import {averageAssignmentsCalculator, dataSelectorFilter, GetTitleText} from '../../utils';
import {AssignmentInfo} from './widgets/AssignmentInfo';
import {StudentsResults} from './widgets/StudentsResults';


export const Assignment = () => {
	const routeParams = useParams();
	const assignmentId = routeParams.assignmentid;

	const assignmentsData = useSelector((state) => state.assignmentsData);
	const filteredAssignmentsData = dataSelectorFilter(assignmentsData, [assignmentId]);

	const studentsData = useSelector((state) => state.studentsData);
	const studentSelect = useSelector((state) => state.studentSelect);
	const filteredStudentData = dataSelectorFilter(studentsData, studentSelect);
	const averageData = averageAssignmentsCalculator(filteredAssignmentsData, filteredStudentData);

	const chartTitle = GetTitleText(filteredStudentData, filteredAssignmentsData, 'result');

	return (<div className="pageContainer">
		<div className={'widgetTitle pageTitle'}>Assignment</div>
		<Chart
			data={averageData.students}
			title={chartTitle}
			dataKeyY={{funFactor: 'funFactor', difficulty: 'difficulty'}}
			type={'student'}
			general={averageData.general}
		/>
		<AssignmentInfo assignmentId={assignmentId} assignmentsData={assignmentsData}/>
		<StudentsResults assignmentId={assignmentId} studentsData={studentsData}/>
	</div>);
};
