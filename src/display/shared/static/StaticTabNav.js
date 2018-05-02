import React from 'react';
import PropTypes from 'prop-types';
import {
	Nav
} from 'reactstrap';
import StaticTabNavItem from './StaticTabNavItem';

const propTypes = {
	activeTab: PropTypes.string.isRequired,
	setActiveTab: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
const StaticTabNav = (props) => {
	const { activeTab, setActiveTab, options } = props;
	const optionElements = options.map(o => (
		<StaticTabNavItem
			tabId={o.tabId}
			activeTab={activeTab}
			setActiveTab={setActiveTab}
			iconId={o.icon}
			title={o.name}
			key={o.tabId}
		/>
	));
	return (
		<Nav className="flex-column static-tab-nav">
			{optionElements}
		</Nav>
	);
};
StaticTabNav.propTypes = propTypes;

export default StaticTabNav;
