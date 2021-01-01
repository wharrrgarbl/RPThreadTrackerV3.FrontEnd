import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getColumns from './components/_archiveColumns';
import getTdProps from './components/_getTdProps';
import ThreadTable from './components/ThreadTable';
import { getUi } from '../../../infrastructure/selectors/common';
import * as selectors from '../../../infrastructure/selectors';
import { useArchivedThreads } from '~/display/containers/useThreads';

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
	const characters = selectors.getArchivedThreadCharacters(state);
	const partners = selectors.getArchivedThreadPartners(state);
	const lastPosters = selectors.getArchivedThreadLastPosters(state);
	const { useLightTheme } = getUi(state);
	return {
		characters,
		partners,
		lastPosters,
		useLightTheme
	};
}

function ArchivedThreads(props) {
	const threads = useArchivedThreads();

	const {
		openUntrackThreadModal,
		openEditThreadModal,
		toggleThreadIsArchived,
		toggleThreadIsMarkedQueued,
		characters,
		partners,
		lastPosters,
		tags
	} = props;
	return (
		<ThreadTable
			{...props}
			filteredThreads={threads}
			tags={tags}
			isArchive
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

ArchivedThreads.propTypes = propTypes;
export default connect(mapStateToProps)(ArchivedThreads);
