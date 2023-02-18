import React from 'react';
import {CalendarToday, MailOutline, PermIdentity, PhoneAndroid} from '@mui/icons-material';
import moment from 'moment/moment';
import {dataSelectorFilter} from '../../../utils';

export const StudentBio = ({studentId, studentsData}) => {
	const filteredStudentData = dataSelectorFilter(studentsData, [studentId]);
	const studentData = Object.values(filteredStudentData)[0];
	const age = moment(Date.now()).diff(moment(Date.parse(studentData.birthday)), 'years');
	return (<div className="widgetContainer studentShow">
		<div className="studentShowTop">
			<img src={studentData.avatar} alt="" className="studentShowImg"/>
			<div className="studentShowTopTitle">
              <span className="studentShowUsername">
                {studentData.first_name} {studentData.last_name}
              </span>
			</div>
		</div>
		<div className="studentShowBottom">
			<span className="studentShowTitle">Account details</span>
			<div className="studentShowInfo">
				<PermIdentity className="studentShowIcon"/>
				<span className="studentShowInfoTitle">
                {studentData.first_name} {studentData.last_name}
              </span>
			</div>
			<div className="studentShowInfo">
				<CalendarToday className="studentShowIcon"/>
				<span className="studentShowInfoTitle">
                {studentData.birthday} ({age} years old)
              </span>
			</div>
			<span className="studentShowTitle">Contact details</span>
			<div className="studentShowInfo">
				<PhoneAndroid className="studentShowIcon"/>
				<span className="studentShowInfoTitle">{studentData.phone}</span>
			</div>
			<div className="studentShowInfo">
				<MailOutline className="studentShowIcon"/>
				<span className="studentShowInfoTitle">{studentData.email}</span>
			</div>
		</div>
	</div>);
};