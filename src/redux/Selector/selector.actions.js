import {ASSIGNMENTSELECT, MENUITEMSELECT, STICKYSELECT, STUDENTSELECT, THEMESELECT,BACKGROUNDSELECT} from './selector.types';

const selectStudents = (ids) => {
	return {
		type: STUDENTSELECT,
		payload: ids
	};
};
const selectMenuItem = (menuItem) => {
	return {
		type: MENUITEMSELECT,
		payload: menuItem
	};
};
const selectSticky = (sticky) => {
	return {
		type: STICKYSELECT,
		payload: sticky
	};
};
const selectTheme = (theme) => {
	return {
		type: THEMESELECT,
		payload: theme
	};
};
const selectAssignments = (ids) => {
	return {
		type: ASSIGNMENTSELECT,
		payload: ids
	};
};
const selectBackgroundImage = (ids) => {
	return {
		type: BACKGROUNDSELECT,
		payload: ids
	};
};
export {selectStudents, selectAssignments, selectMenuItem, selectSticky, selectTheme, selectBackgroundImage};