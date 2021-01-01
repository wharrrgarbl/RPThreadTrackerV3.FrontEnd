import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getColumns from './components/_columns';
import getTdProps from './components/_getTdProps';
import ThreadTable from './components/ThreadTable';
import { getUi } from '../../../infrastructure/selectors/common';
import * as actions from '../../../infrastructure/actions';
import * as selectors from '../../../infrastructure/selectors';

const propTypes = {
	fetchActiveThreads: PropTypes.func.isRequired,
	activeThreads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	filteredThreads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	openUntrackThreadModal: PropTypes.func.isRequired,
	openEditThreadModal: PropTypes.func.isRequired,
	toggleThreadIsArchived: PropTypes.func.isRequired,
	toggleThreadIsMarkedQueued: PropTypes.func.isRequired,
	characters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	partners: PropTypes.arrayOf(PropTypes.string).isRequired,
	lastPosters: PropTypes.arrayOf(PropTypes.string).isRequired,
	tags: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	useLightTheme: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	const { activeThreads } = state;
	const characters = selectors.getActiveThreadCharacters(state);
	const partners = selectors.getActiveThreadPartners(state);
	const lastPosters = selectors.getActiveThreadLastPosters(state);
	const tags = selectors.getActiveThreadTags(state);
	const filteredThreads = selectors.getMyTurnFilteredThreads(state);
	const { useLightTheme } = getUi(state);
	console.log({ state });
	return {
		activeThreads,
		filteredThreads,
		characters,
		partners,
		lastPosters,
		tags,
		useLightTheme
	};
}

// function MyTurnThreads(props) {
// 	const [status, threads] = useThreads('myturn');
// 	if (status === 'loading' || status === 'done') { // due to chunking, i guess?
// 		return <ThreadTable {...props} threads={threads} />;
// 	}

// 	return <Error />;
// }

function MyTurnThreads(props) {
	const { activeThreads, fetchActiveThreads } = props;

	useEffect(() => {
		if (!activeThreads || !activeThreads.length) {
			fetchActiveThreads();
		}
	}, []);

	const {
		filteredThreads,
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
			filteredThreads={filteredThreads}
			tags={tags}
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

MyTurnThreads.propTypes = propTypes;
export default connect(mapStateToProps, {
	fetchActiveThreads: actions.fetchActiveThreads
})(MyTurnThreads);
