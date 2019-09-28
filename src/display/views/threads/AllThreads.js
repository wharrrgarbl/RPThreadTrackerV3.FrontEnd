// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getColumns from './components/_allThreadsColumns';
import getTdProps from './components/_getTdProps';
import ThreadTable from './components/ThreadTable';
import { getUi } from '../../../infrastructure/selectors/common';
import * as selectors from '../../../infrastructure/selectors';
import { useActiveThreads } from '~/display/containers/useThreads';

const propTypes = {
	openUntrackThreadModal: PropTypes.func.isRequired,
	openEditThreadModal: PropTypes.func.isRequired,
	toggleThreadIsArchived: PropTypes.func.isRequired,
	toggleThreadIsMarkedQueued: PropTypes.func.isRequired,
	characters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	partners: PropTypes.arrayOf(PropTypes.string).isRequired,
	lastPosters: PropTypes.arrayOf(PropTypes.string).isRequired,
	useLightTheme: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	const characters = selectors.getActiveThreadCharacters(state);
	const partners = selectors.getActiveThreadPartners(state);
	const lastPosters = selectors.getActiveThreadLastPosters(state);
	const { useLightTheme } = getUi(state);
	return {
		characters,
		partners,
		lastPosters,
		useLightTheme
	};
}

function AllActiveThreads(props) {
	const threads = useActiveThreads();

	const {
		openUntrackThreadModal,
		openEditThreadModal,
		toggleThreadIsArchived,
		toggleThreadIsMarkedQueued,
		characters,
		partners,
		lastPosters,
	} = props;
	return (
		<ThreadTable
			{...props}
			filteredThreads={threads}
			isAllThreads
			columns={getColumns(characters, partners, lastPosters)}
			tdProps={getTdProps(
				openUntrackThreadModal,
				openEditThreadModal,
				toggleThreadIsArchived,
				toggleThreadIsMarkedQueued
			)}
		/>
	);
}

AllActiveThreads.propTypes = propTypes;
export default connect(mapStateToProps)(AllActiveThreads);
