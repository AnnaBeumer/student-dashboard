import {
	ASSIGNMENTADD,
	ASSIGNMENTSFETCH,
	ASSIGNMENTUPDATE,
	STUDENTADD,
	STUDENTSFETCH,
	STUDENTUPDATE,
	STUDENTDELETE,
	ASSIGNMENTDELETE
} from './init.types';

const assignmentsDataFetcher = (assignmentsData) => {
	return {
		type: ASSIGNMENTSFETCH, payload: assignmentsData
	};
};
const studentsDataFetcher = (studentsData) => {
	return {
		type: STUDENTSFETCH, payload: studentsData
	};
};
const studentsDataUpdater = (updatedStudentsData) => {
	return {
		type: STUDENTUPDATE, payload: updatedStudentsData
	};
};
const studentDelete = (studentsDelete) => {
	return {
		type: STUDENTDELETE, payload: studentsDelete
	};
};

const studentsDataAdd = (addStudentsData) => {
	return {
		type: STUDENTADD, payload: addStudentsData
	};
};

const assignmentDataUpdater = (updatedAssignmentsData) => {
	return {
		type: ASSIGNMENTUPDATE, payload: updatedAssignmentsData
	};
};

const assignmentDataAdd = (newAssignmentsData) => {
	return {
		type: ASSIGNMENTADD, payload: newAssignmentsData
	};
};
const assignmentDelete = (assignmentDelete) => {
	return {
		type: ASSIGNMENTDELETE, payload: assignmentDelete
	};
};

export {
	assignmentsDataFetcher,
	studentsDataFetcher,
	studentsDataUpdater,
	studentsDataAdd,
	assignmentDataUpdater,
	assignmentDataAdd,
	studentDelete,
	assignmentDelete
};
