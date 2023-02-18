import {combineReducers} from 'redux';
import {assignmentsDataReducer, studentsDataReducer} from './Init/init.reducer';
import {
	assignmentSelectReducer,
	menuItemSelectReducer,
	stickySelectReducer,
	studentSelectReducer,
	themeSelectReducer,
	backgroundSelectReducer
} from './Selector/selector.reducer';

const rootReducer = combineReducers({
	studentsData: studentsDataReducer,
	assignmentsData: assignmentsDataReducer,
	studentSelect: studentSelectReducer,
	assignmentSelect: assignmentSelectReducer,
	menuItemSelect: menuItemSelectReducer,
	stickySelect: stickySelectReducer,
	themeSelect: themeSelectReducer,
	backgroundSelect: backgroundSelectReducer
});

export default rootReducer;
