import React from 'react';
import '../css/studentEdit.css';
import {Publish} from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import store from '../../../redux/store';
import {studentDelete, studentsDataUpdater} from '../../../redux/Init/init.actions';
import {dataSelectorFilter} from '../../../utils';
import {useNavigate} from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

export const StudentEdit = ({studentId, studentsData}) => {
	const navigate = useNavigate();
	const handleUpdate = event => {
		event.preventDefault();
		store.dispatch(studentsDataUpdater({[studentId]: pageState}));
	};
	const handleDelete = event => {
			event.preventDefault();
		if (window.confirm('Are you sure you wish to delete this Student?')) {
			store.dispatch(studentDelete(studentId));
			navigate(`/students`);
		}
	};
	const filteredStudentData = dataSelectorFilter(studentsData, [studentId]);
	const studentData = Object.values(filteredStudentData)[0];
	const [pageState, setPageState] = React.useState(studentData);

	return (<div className="widgetContainer studentUpdate">
		<span className="studentUpdateTitle">Edit</span>
		<form className="studentUpdateForm">
			<div className="studentUpdateLeft">
				<div className="studentUpdateItem">
					<label>First Name</label>
					<input
						type="text"
						defaultValue={studentData.first_name}
						onChange={(e) => setPageState({...pageState, first_name: e.target.value})}
						className="InputForm"
					/>
				</div>
				<div className="studentUpdateItem">
					<label>Last Name</label>
					<input
						type="text"
						defaultValue={studentData.last_name}
						onChange={(e) => setPageState({...pageState, last_name: e.target.value})}
						className="InputForm"
					/>
				</div>
				<div className="studentUpdateItem">
					<label>birth date</label>
					<DatePicker className="InputForm"
					            showMonthDropdown
					            showYearDropdown
					            dateFormatCalendar="MMMM"
					            yearDropdownItemNumber={50}
					            maxDate={new Date(Date.now())}
					            minDate={new Date('01/01/1940')}
					            scrollableYearDropdown
					            selected={new Date(pageState.birthday)}
					            onChange={(date) => {
						            if (date === null) {
							            date = new Date(studentData.birthday);
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
						defaultValue={studentData.email}
						onChange={(e) => setPageState({...pageState, email: e.target.value})}
						className="InputForm"
					/>
				</div>
				<div className="studentUpdateItem">
					<label>Phone</label>
					<input
						type="text"
						defaultValue={studentData.phone}
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
				<div>
					<div className="flexContainer">
						<button
							className="rootButton"
							onClick={handleUpdate}
						>
							Update
						</button>
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
		</form>
	</div>);
};