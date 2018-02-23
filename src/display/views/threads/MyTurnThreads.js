import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getColumns from './components/_columns';
import Threads from './Threads';
import { fetchActiveThreads } from '../../../infrastructure/actions';
import { getMyTurnFilteredThreads, getActiveThreadTags } from '../../../infrastructure/selectors';

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	activeThreads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	filteredThreads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	tags: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

function mapStateToProps(state) {
	const { activeThreads } = state;
	const filteredThreads = getMyTurnFilteredThreads(state);
	const tags = getActiveThreadTags(state);
	return {
		activeThreads,
		filteredThreads,
		tags
	};
}

class MyTurnThreads extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		if (!this.props.activeThreads || !this.props.activeThreads.length) {
			dispatch(fetchActiveThreads());
		}
	}

	render() {
		const {
			filteredThreads,
			tags
		} = this.props;
		return (
			<Threads
				{...this.props}
				filteredThreads={filteredThreads}
				columns={getColumns()}
				tags={tags}
			/>
		);
	}
}

MyTurnThreads.propTypes = propTypes;
export default connect(mapStateToProps)(MyTurnThreads);
