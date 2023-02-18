import React from 'react';
import {useSelector} from 'react-redux';
import DatePicker from 'react-datepicker';
import {Publish} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import store from '../../redux/store';
import {studentsDataAdd} from '../../redux/Init/init.actions';
import 'react-datepicker/dist/react-datepicker.css';

export const NewStudent = () => {
	const navigate = useNavigate();
	const studentsData = useSelector((state) => state.studentsData);
	const assignmentsData = useSelector((state) => state.assignmentsData);
	const newStudentNumber = (Object.keys(studentsData).reduce((acc, student_number) => {
		if (student_number - 0 > acc) {
			acc = student_number - 0;
		}
		return acc;
	}, 0) + 1).toString();
	const collectedAssignments = Object.keys(assignmentsData).reduce((acc, assignment_code) => {
		acc[assignment_code] = {difficulty: 'NA', funFactor: 'NA'};
		return acc;
	}, {});
	const [pageState, setPageState] = React.useState({
		id: newStudentNumber,
		student_number: newStudentNumber,
		first_name: '',
		last_name: '',
		birthday: '01/01/1940',
		email: '',
		phone: '',
		avatar: `https://robohash.org/${newStudentNumber}?set=set4`,
		assignments: collectedAssignments
	});

	const handleAddStudent = (event) => {
		event.preventDefault();
		store.dispatch(studentsDataAdd({[newStudentNumber]: pageState}));
		navigate(`/student/${pageState.student_number}`);
	};

	return (<div className="pageContainer">
		<div className={'widgetTitle pageTitle'}>New Student</div>
		<div className="widgetContainer studentUpdate">
			<form className="studentUpdateForm">
				<div className="studentUpdateLeft">
					<div className="studentUpdateItem">
						<label>First Name</label>
						<input
							type="text"
							defaultValue={pageState.first_name}
							onChange={(e) => setPageState({...pageState, first_name: e.target.value})}
							className="InputForm"
						/>
					</div>
					<div className="studentUpdateItem">
						<label>Last Name</label>
						<input
							type="text"
							defaultValue={pageState.last_name}
							onChange={(e) => setPageState({...pageState, last_name: e.target.value})}
							className="InputForm"
						/>
					</div>
					<div className="studentUpdateItem">
						<label>birth date</label>
						<DatePicker className={'InputForm'}
						            showMonthDropdown
						            value={new Date(pageState.birthday)}
						            showYearDropdown
						            dateFormatCalendar="MMMM"
						            yearDropdownItemNumber={50}
						            maxDate={new Date(Date.now())}
						            minDate={new Date('01/01/1940')}
						            scrollableYearDropdown
						            selected={new Date(pageState.birthday)}
						            onChange={(date) => {
							            if (date === null) {
								            date = new Date(pageState.birthday);
							            }
							            setPageState({
								            ...pageState, birthday: date.toLocaleDateString('en-US', {
									            year: 'numeric', month: '2-digit', day: '2-digit'
								            })
							            });
						            }}/>
					</div>
					<div className="studentUpdateItem">
						<label>Email</label>
						<input
							type="text"
							defaultValue={pageState.email}
							onChange={(e) => setPageState({...pageState, email: e.target.value})}
							className="InputForm"
						/>
					</div>
					<div className="studentUpdateItem">
						<label>Phone</label>
						<input
							type="text"
							defaultValue={pageState.phone}
							onChange={(e) => setPageState({...pageState, phone: e.target.value})}
							className="InputForm"
						/>
					</div>
				</div>
				<div className="studentUpdateRight">
					<div className="studentUpdateUpload">
						<img
							src={pageState.avatar}
							alt=""
							className="studentUpdateImg"
						/>
						<label htmlFor="file">
							<Publish className="studentUpdateIcon"/>
						</label>
						<input type="file" id="file" style={{display: 'none'}} accept="image/png, image/jpeg"
						       onChange={(e) => setPageState({
							       ...pageState, avatar: URL.createObjectURL(e.target.files[0])
						       })}/>
					</div>
					<button
						className="studentUpdateButton"
						onClick={handleAddStudent}
					>
						Add new student
					</button>
				</div>
			</form>
		</div>
	</div>);
};