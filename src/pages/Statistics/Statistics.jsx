import React from 'react';
import {AverageCourse} from './widgets/AverageCourse';
import './css/statistics.css';
import {useSelector} from 'react-redux';
import {averageAssignmentsCalculator} from '../../utils';
import {TopThreeItems} from './widgets/TopThreeItems';


export const Statistics = () => {
	const studentsData = useSelector((state) => state.studentsData);
	const assignmentsData = useSelector((state) => state.assignmentsData);
	const averageData = averageAssignmentsCalculator(assignmentsData, studentsData);
	return (<div className="pageContainer">
		<div className={'widgetTitle pageTitle'}>Statistics</div>
		<div className={'flexContainer'}>
			<div className={'widgetLeft'}>
				<div className={'widgetContainer'}>
					<AverageCourse averageData={averageData.general}/>
				</div>
			</div>
			<div className={'widgetRight'}></div>
		</div>
		<div className={'flexContainer'}>
			<div className={'widgetLeft'}>
				<div className={'widgetContainer'}>
					<TopThreeItems averageData={averageData.assignments}
					               headerText={'Course Averages Top Three'}
					               type={'assignment'}/>
				</div>
			</div>
			<div className={'widgetRight'}>
				<div className={'widgetContainer'}>
					<TopThreeItems averageData={averageData.students}
					               headerText={'Students Averages Top Three'}
					               type={'student'}/>
				</div>
			</div>
		</div>
	</div>);
};