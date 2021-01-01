import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AtAGlanceCard from './components/at-a-glance/AtAGlanceCard';
import RecentActivityCard from './components/recent-activity/RecentActivityCard';
import YourCharactersCard from './components/your-characters/YourCharactersCard';
import TrackerSupportCard from './components/tracker-support/TrackerSupportCard';
import RandomThreadCard from './components/random-thread/RandomThreadCard';
import Style from './_styles';
import * as actions from '../../../infrastructure/actions';
import * as selectors from '../../../infrastructure/selectors';
import { useThreadContext } from '~/display/containers/ThreadContext';
import { useActiveThreads, useRecentThreads } from '~/display/containers/useThreads';

const propTypes = {
	characters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	characterThreadCounts: PropTypes.shape({}).isRequired,
	fetchActiveThreads: PropTypes.func.isRequired,
	fetchCharacters: PropTypes.func.isRequired,
	generateRandomThread: PropTypes.func.isRequired,
	isLoadingIconVisible: PropTypes.bool.isRequired,
	openUntrackThreadModal: PropTypes.func.isRequired,
	randomThread: PropTypes.shape({}).isRequired,
	updateUserSettings: PropTypes.func.isRequired,
	upsertThread: PropTypes.func.isRequired,
	userSettings: PropTypes.shape({
		id: PropTypes.string,
		showDashboardThreadDistribution: PropTypes.bool
	}).isRequired
};

function mapStateToProps(state) {
	const { characters, userSettings, activeThreads, randomThread } = state;
	const characterThreadCounts = selectors.getThreadCountsByCharacter(state);
	const isLoadingIconVisible = selectors.getIsLoadingIconVisible(state);
	return {
		characters,
		userSettings,
		randomThread,
		characterThreadCounts,
		isLoadingIconVisible
	};
}

class _Dashboard extends Component {
	constructor(props) {
		super(props);
		// eslint-disable-next-line max-len
		this.showDashboardThreadDistributionToggle = this.showDashboardThreadDistributionToggle.bind(
			this
		);
		this.archiveThread = this.archiveThread.bind(this);
		this.markThreadQueued = this.markThreadQueued.bind(this);
	}

	componentDidMount() {
		const {
			characters, fetchCharacters
		} = this.props;
		if (!characters || !characters.length) {
			fetchCharacters();
		}
	}

	showDashboardThreadDistributionToggle() {
		const { userSettings, updateUserSettings } = this.props;
		updateUserSettings({
			...userSettings,
			showDashboardThreadDistribution: !userSettings.showDashboardThreadDistribution
		});
	}

	archiveThread(thread) {
		const { upsertThread } = this.props;
		const updatedThread = {
			...thread,
			isArchived: !thread.isArchived
		};
		upsertThread(updatedThread);
	}

	markThreadQueued(thread) {
		const { upsertThread } = this.props;
		const updatedThread = {
			...thread,
			dateMarkedQueued: new Date(Date.now())
		};
		upsertThread(updatedThread);
	}

	render() {
		const {
			characters,
			userSettings,
			activeThreads,
			myTurnThreads,
			theirTurnThreads,
			queuedThreads,
			recentActivityThreads,
			randomThread,
			isLoadingIconVisible,
			characterThreadCounts,
			openUntrackThreadModal,
			generateRandomThread
		} = this.props;

		return (
			<Style className="animated fadeIn dashboard-container">
				<Row>
					<Col>
						<AtAGlanceCard
							data-spec="dashboard-at-a-glance-card"
							showDashboardThreadDistribution={
								userSettings.showDashboardThreadDistribution
							}
							showDashboardThreadDistributionToggle={
								this.showDashboardThreadDistributionToggle
							}
							myTurnThreads={myTurnThreads}
							theirTurnThreads={theirTurnThreads}
							activeThreads={activeThreads}
							queuedThreads={queuedThreads}
							isLoadingIconVisible={isLoadingIconVisible}
						/>
					</Col>
				</Row>
				<Row>
					<Col xs="12" md="6">
						<RecentActivityCard
							data-spec="dashboard-recent-activity-card"
							recentActivityThreads={recentActivityThreads}
							allThreads={activeThreads}
							characters={characters}
							archiveThread={this.archiveThread}
							openUntrackThreadModal={openUntrackThreadModal}
							markThreadQueued={this.markThreadQueued}
							loadingInProgress={isLoadingIconVisible}
						/>
					</Col>
					<Col xs="12" md="6">
						<YourCharactersCard
							characters={characters}
							characterThreadCounts={characterThreadCounts}
							loadingInProgress={isLoadingIconVisible}
						/>
					</Col>
				</Row>
				<Row>
					<Col md="6" xs="12">
						<RandomThreadCard
							data-spec="dashboard-random-thread-card"
							generateRandomThread={generateRandomThread}
							randomThread={randomThread}
						/>
					</Col>
					<Col md="6" xs="12">
						<TrackerSupportCard />
					</Col>
				</Row>
			</Style>
		);
	}
}

function DashboardWithContext(props) {
	const threadContext = useThreadContext();
	const allActiveThreads = useActiveThreads();
	const myTurnThreads = allActiveThreads.filter(({ status }) => status.isCallingCharactersTurn);
	const theirTurnThreads = allActiveThreads.filter(({ status }) => !status.isCallingCharactersTurn);
	const queuedThreads = allActiveThreads.filter(({ status }) => status.isQueued);
	console.log({ myTurnThreads, queuedThreads })
	const recentThreads = useRecentThreads();
	return (
		<_Dashboard
			{...props}
			updateThread={threadContext.updateThread}
			activeThreads={allActiveThreads}
			myTurnThreads={myTurnThreads}
			theirTurnThreads={theirTurnThreads}
			queuedThreads={queuedThreads}
			recentActivityThreads={recentThreads}
		/>
	);
}

DashboardWithContext.propTypes = propTypes;
export default connect(mapStateToProps, {
	fetchActiveThreads: actions.fetchActiveThreads,
	fetchCharacters: actions.fetchCharacters,
	generateRandomThread: actions.generateRandomThread,
	openUntrackThreadModal: actions.openUntrackThreadModal,
	updateUserSettings: actions.updateUserSettings,
	upsertThread: actions.upsertThread
})(DashboardWithContext);
