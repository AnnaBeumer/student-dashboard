import React from 'react';
import {useSelector} from 'react-redux';
import {Chart} from '../../Components/charts/chart/Chart';
import {StudentList} from './widgets/StudentList';
import {AssignmentList} from './widgets/AssignmentList';
import {averageAssignmentsCalculator, dataSelectorFilter, GetTitleText} from '../../utils';

export const Home = () => {
	const studentsData = useSelector((state) => state.studentsData);
	const assignmentsData = useSelector((state) => {
		return state.assignmentsData;
	});
	const studentSelect = useSelector((state) => {
		return state.studentSelect;
	});
	const assignmentSelect = useSelector((state) => {
		return state.assignmentSelect;
	});
	const filteredAssignmentsData = dataSelectorFilter(assignmentsData, assignmentSelect);
	const filteredStudentData = dataSelectorFilter(studentsData, studentSelect);
	const averageData = averageAssignmentsCalculator(filteredAssignmentsData, filteredStudentData);
	const chartTitle = GetTitleText(filteredStudentData, filteredAssignmentsData, 'average');

	return (
		<div className="pageContainer">
			<div className={'widgetTitle pageTitle'}>Home</div>
			<Chart
				data={averageData.assignments}
				title={chartTitle}
				assignment
				dataKeyY={{funFactor: 'funFactor', difficulty: 'difficulty'}}
				type={'assignment'}
				general={averageData.general}
			/>

			<div className={'flexContainer'}>
				<div className="widgetLeft">
					<div className={'widgetContainer'}>
						<StudentList studentsData={studentsData}/>
					</div>
				</div>
				<div className="widgetRight">
					<div className={'widgetContainer'}>
						<AssignmentList assignmentsData={assignmentsData}/>
					</div>
				</div>
			</div>

		</div>
	);
};
