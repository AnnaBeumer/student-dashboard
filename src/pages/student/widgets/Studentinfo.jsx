import React from 'react';
import {StudentBio} from './StudentBio';
import {StudentEdit} from './StudentEdit';

export const StudentInfo = ({studentId, studentsData}) => {
	return (<div className="flexContainer ">
		<StudentBio studentId={studentId} studentsData={studentsData}/>
		<StudentEdit studentId={studentId} studentsData={studentsData}/>
	</div>);
};