import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {averageAssignmentsCalculator, dataSelectorFilter, GetTitleText} from '../../utils';
import {Chart} from '../../Components/charts/chart/Chart';
import {StudentInfo} from './widgets/Studentinfo';
import {AssignmentsResult} from './widgets/AssignmentsResults';

export const Student = () => {
	const routeParams = useParams();
	const studentId = routeParams.studentid;

	const studentsData = useSelector((state) => state.studentsData);
	const filteredStudentData = dataSelectorFilter(studentsData, [studentId]);
	// const studentData = Object.values(filteredStudentData)[0];

	const assignmentsData = useSelector((state) => state.assignmentsData);
	const assignmentSelect = useSelector((state) => state.assignmentSelect);
	const filteredAssignmentsData = dataSelectorFilter(assignmentsData, assignmentSelect);

	const averageData = averageAssignmentsCalculator(filteredAssignmentsData, filteredStudentData);
	const chartTitle = GetTitleText(filteredStudentData, filteredAssignmentsData, 'result');
	return (<div className="pageContainer">
		<div className={'widgetTitle pageTitle'}>Student</div>
		<Chart
			data={averageData.assignments}
			title={chartTitle}
			dataKeyY={{funFactor: 'funFactor', difficulty: 'difficulty'}}
			type={'assignment'}
			filteredData={filteredAssignmentsData}
			general={averageData.general}
		/>
		<StudentInfo studentId={studentId} studentsData={studentsData}/>
		<AssignmentsResult studentId={studentId} studentsData={studentsData}/>
	</div>);
};
