import React, { Component } from 'react';
import {
	Row, Col
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPublicThreads, fetchLegacyPublicThreads } from '../../../infrastructure/actions';
import ThreadTable from './PublicThreadTable';
import PublicHeader from './PublicHeader';
import getColumns from './_columns';
import { getPublicThreads, getIsLoadingIconVisible } from '../../../infrastructure/selectors';
import Footer from '../../shared/footer/Footer';
import { legacyPublicSlugs, buildLegacyView } from '../../../infrastructure/constants/legacyPublicValues';
import { getQuery } from '../../../utility';

const propTypes = {
	isLoadingIconVisible: PropTypes.bool.isRequired,
	threads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	fetchLegacyPublicThreads: PropTypes.func.isRequired,
	slug: PropTypes.string,
	view: PropTypes.shape({}).isRequired,
	fetchPublicThreads: PropTypes.func.isRequired
};

const defaultProps = {
	slug: ''
};

function mapStateToProps(state) {
	const publicThreads = getPublicThreads(state);
	const isLoadingIconVisible = getIsLoadingIconVisible(state);
	return {
		view: state.publicThreads.view,
		threads: publicThreads,
		isLoadingIconVisible
	};
}

class Public extends Component {
	componentDidMount() {
		const { slug } = this.props;
		if (legacyPublicSlugs.includes(slug)) {
			this.fetchLegacyView(slug);
			return;
		}
		this.props.fetchPublicThreads(this.props.slug);
	}
	fetchLegacyView(slug) {
		const query = getQuery();
		const view = buildLegacyView(query, slug);
		this.props.fetchLegacyPublicThreads(view);
	}
	render() {
		const {
			view,
			threads,
			slug,
			isLoadingIconVisible
		} = this.props;
		return (
			<div className="animated fadeIn">
				<PublicHeader title={view.name} slug={slug} isLoadingIconVisible={isLoadingIconVisible} />
				<Row>
					<Col>
						<ThreadTable
							columns={getColumns(view.columns)}
							threads={threads}
							view={view}
							isLoadingIconVisible={isLoadingIconVisible}
						/>
					</Col>
				</Row>
				<Footer />
			</div >
		);
	}
}

Public.propTypes = propTypes;
Public.defaultProps = defaultProps;
export default connect(mapStateToProps, {
	fetchPublicThreads,
	fetchLegacyPublicThreads
})(Public);
