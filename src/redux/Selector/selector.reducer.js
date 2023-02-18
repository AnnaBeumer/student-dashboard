import {ASSIGNMENTSELECT, MENUITEMSELECT, STICKYSELECT, STUDENTSELECT, THEMESELECT, BACKGROUNDSELECT} from './selector.types';


const studentSelectReducer = (state = [], action) => {
	switch (action.type) {
		case STUDENTSELECT:
			return action.payload;
		default:
			return state;
	}
};
const menuItemSelectReducer = (state = 'Home', action) => {
	switch (action.type) {
		case MENUITEMSELECT:
			return action.payload;
		default:
			return state;
	}
};
const stickySelectReducer = (state = false, action) => {
	switch (action.type) {
		case STICKYSELECT:
			return action.payload;
		default:
			return state;
	}
};
const themeSelectReducer = (state = 'default', action) => {
	switch (action.type) {
		case THEMESELECT:
			return action.payload;
		default:
			return state;
	}
};
const assignmentSelectReducer = (state = [], action) => {
	switch (action.type) {
		case ASSIGNMENTSELECT:
			return action.payload;
		default:
			return state;
	}
};

const backgroundSelectReducer = (state = true, action) => {
	switch (action.type) {
		case BACKGROUNDSELECT:
			return action.payload;
		default:
			return state;
	}
};
export {studentSelectReducer, assignmentSelectReducer, menuItemSelectReducer, stickySelectReducer, themeSelectReducer, backgroundSelectReducer};
