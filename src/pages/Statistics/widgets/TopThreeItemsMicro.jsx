import React from 'react';
import * as material from '@mui/material';
import store from '../../../redux/store';
import {selectAssignments, selectStudents} from '../../../redux/Selector/selector.actions';
import {useNavigate} from 'react-router-dom';

export const TopThreeItemsMicro = ({listingObj, type, valueResults}) => {
	const navigate = useNavigate();
	const handleNavigate = (e) => {
		store.dispatch(selectStudents([]));
		store.dispatch(selectAssignments([]));
		const id = valueResults.nameLookupTable[e.item];
		navigate(`/${type}/${id}`);
	};
	const handleSelection = (selectedItemNames) => {
		const selectedItems = selectedItemNames.map((itemName) => valueResults.nameLookupTable[itemName]);
		if (type === 'assignment') {
			store.dispatch(selectAssignments(selectedItems));
			store.dispatch(selectStudents([]));
		} else {
			store.dispatch(selectAssignments([]));
			store.dispatch(selectStudents(selectedItems));
		}
		navigate(`/`);
	};
	return (<div className={'statistics-grid-item statistics-grid'}>
		{Object.keys(listingObj).map((entryKey, index) => {
			return (<div className={' flexContainer statistics-boxTopLine'} key={index.toString()}>
				<material.Tooltip
					title={type === 'assignment' ? 'Show all students with corresponded assignment(s)' : 'Show all assignments with coresponded student(s)'}>
					<ul className={'statistics-mid-column no-bullets statistics-clickable'}>
						<li key={index.toString()}
						    onClick={() => handleSelection(listingObj[entryKey])}>{entryKey}</li>
					</ul>
				</material.Tooltip>
				<material.Tooltip
					title={type === 'assignment' ? 'Show assignment with all the students' : 'Show student with all the assignments'}>
					<ul className={'statistics-right-column no-bullets statistics-clickable '}>
						<li key={index.toString()}>{Object.values(listingObj[entryKey]).map((item, index, arr) => {
							return (<span key={index.toString()}
							              onClick={() => handleNavigate({item: item})}>{item}<br/></span>);
						})}</li>
					</ul>
				</material.Tooltip>
			</div>);
		})}
	</div>);
};