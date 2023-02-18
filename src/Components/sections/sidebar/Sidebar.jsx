import React from 'react';
import './sidebar.css';
import {AssignmentOutlined, HomeOutlined, Insights, PersonOutline, SettingsOutlined} from '@mui/icons-material';
import {Link, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import store from '../../../redux/store';
import {selectMenuItem} from '../../../redux/Selector/selector.actions';

export const Sidebar = () => {
	// Left menu highlight depended on the pathname location
	const location = useLocation();
	React.useEffect(() => {
		function getPath(dep) {
			if (dep.toLowerCase().includes('student')) {
				return 'Students';
			}
			if (dep.toLowerCase().includes('assignment')) {
				return 'Assignments';
			}
			if (dep.toLowerCase().includes('statistics')) {
				return 'Statistics';
			}
			if (dep.toLowerCase().includes('settings')) {
				return 'Settings';
			}
			return 'Home';
		}

		store.dispatch(selectMenuItem(getPath(location.pathname)));
	}, [location.pathname]);
	const selectedMenuItem = useSelector((state) => {
		return state.menuItemSelect;
	});
	return (

		<div className="sidebar">
			<div className="sidebarWrapper">
				<div className="sidebarMenu">
					<h3 className="sidebarTitle">Dashboard</h3>
					<ul className="sidebarList">
						<Link to="/" className="link">
							<li
								className={selectedMenuItem === 'Home' ? 'sidebarListItem active' : 'sidebarListItem'}
							>
								<HomeOutlined className="sidebarIcon"/>
								Home
							</li>
						</Link>
						<Link to="/students" className="link">
							<li
								className={selectedMenuItem === 'Students' ? 'sidebarListItem active' : 'sidebarListItem'}
							>
								<PersonOutline className="sidebarIcon"/>
								Students
							</li>
						</Link>
						<Link to="/assignments" className="link">
							<li
								className={selectedMenuItem === 'Assignments' ? 'sidebarListItem active' : 'sidebarListItem'}
							>
								<AssignmentOutlined className="sidebarIcon"/>
								Assignments
							</li>
						</Link>
						<Link to="/statistics" className="link">
							<li
								className={selectedMenuItem === 'Statistics' ? 'sidebarListItem active' : 'sidebarListItem'}
							>
								<Insights className="sidebarIcon"/>
								Statistics
							</li>
						</Link>
						<Link to="/settings" className="link">
							<li
								className={selectedMenuItem === 'Settings' ? 'sidebarListItem active' : 'sidebarListItem'}
							>
								<SettingsOutlined className="sidebarIcon"/>
								Settings
							</li>
						</Link>
					</ul>
				</div>
			</div>
		</div>
	);
};
