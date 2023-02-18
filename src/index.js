// import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// REDUX
import {Provider} from 'react-redux';
import store from './redux/store';
import {fetchAssignmentsData, fetchResultsData, fetchStudentsData} from './utils';
import {assignmentsDataFetcher, studentsDataFetcher} from './redux/Init/init.actions';

// Thunk function for the init of the users, assignments and the result data
export const dataFetchSlice = async () => {
	// 1. Collect and parse the assignment data
	const assignmentsFetchResponse = await fetchAssignmentsData();
	// 2. Collect and parse the student base data and populate this with the assignments
	const studentsFetchResponse = await fetchStudentsData(assignmentsFetchResponse);
	// 3. Collect the student assignment result data and populate this data into the correspondent students
	await fetchResultsData(studentsFetchResponse);
	// Store the student data
	store.dispatch(studentsDataFetcher(studentsFetchResponse));
	// Store the assignment data
	store.dispatch(assignmentsDataFetcher(assignmentsFetchResponse));
};

const root = ReactDOM.createRoot(document.getElementById('root'));
dataFetchSlice().then(() => {
	root.render(
		<React.StrictMode>
			<Provider store={store}>
				<App/>
			</Provider>
		</React.StrictMode>
	);
});
