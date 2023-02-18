import React from 'react';
import './topbar.css';
import {Link} from 'react-router-dom';
import store from '../../../redux/store';
import {selectMenuItem} from '../../../redux/Selector/selector.actions';
import annaLogo from '../../../data/images/Logo Anna Beumer zonder tekst-1.png';

export const TopBar = () => {
	const handleSelection = (selectedMenuItem) => {
		store.dispatch(selectMenuItem(selectedMenuItem));
	};

	return (<div className="topBar">
			<div className="topBarWrapper">
				<div className="topLeft">
					<Link to="/" className="link" onClick={() => handleSelection('Home')}>
						<span className="logo">Student Dashboard</span>
					</Link>
				</div>
				<div className="topRight">
					<img
						src={annaLogo}
						alt="logo"
						className="topAvatar"
					/>
				</div>
			</div>
		</div>
	);
};
