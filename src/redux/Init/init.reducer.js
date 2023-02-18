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

const studentsDataReducer = (state = {}, action) => {
	switch (action.type) {
		case STUDENTSFETCH:
			return action.payload;
		case STUDENTUPDATE:
			return Object.assign({}, state, action.payload);
		case STUDENTADD:
			return Object.assign({}, state, action.payload);
		case STUDENTDELETE:
			delete state[action.payload];
			return Object.assign({},state)
		default:
			return state;
	}
};

const assignmentsDataReducer = (state = {}, action) => {
	switch (action.type) {
		case ASSIGNMENTSFETCH:
			return action.payload;
		case ASSIGNMENTUPDATE:
			return Object.assign({}, state, action.payload);
		case ASSIGNMENTADD:
			return Object.assign({}, state, action.payload);
		case ASSIGNMENTDELETE:
			delete state[action.payload];
			return Object.assign({},state)
		default:
			return state;
	}
};

export {studentsDataReducer, assignmentsDataReducer};
