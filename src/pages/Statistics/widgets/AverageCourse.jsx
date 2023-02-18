import React from 'react';
import {PictorialBar} from '../../../Components/charts/pictorialBar/PictorialBar';

export const AverageCourse = ({averageData}) => {
	return (<div>
		<div className={'widgetTitle'}>Course Averages</div>
		<div className={'statistics-grid-container'}>
			<div className={'statistics-grid-item'}>Number of courses:</div>
			<div className={'statistics-grid-item statistics-mid-column'}>{averageData.numOfAssignments}</div>
			<div className={'statistics-grid-item'}></div>

			<div className={'statistics-grid-item'}>Number of students:</div>
			<div className={'statistics-grid-item statistics-mid-column'}>{averageData.numOfStudents}</div>
			<div className={'statistics-grid-item'}></div>

			<div className={'statistics-grid-item'}>Average FunFactor:</div>
			<div className={'statistics-grid-item statistics-mid-column'}>{averageData.funFactor}</div>
			<div style={{padding: '0px', height: '35px', width: '150px'}}>
				<PictorialBar data={averageData.funFactor} type={'funFactor'} />
			</div>


			<div className={'statistics-grid-item'}>Average Difficulty:</div>
			<div className={'statistics-grid-item statistics-mid-column'}>{averageData.difficulty}</div>
			<div style={{padding: '0px', height: '35px', width: '150px'}}>
				<PictorialBar data={averageData.difficulty} type={'difficulty'} />
			</div>
		</div>

	</div>);
};