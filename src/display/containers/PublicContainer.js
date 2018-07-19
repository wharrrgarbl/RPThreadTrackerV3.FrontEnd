// #region imports
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import ReduxToastr from 'react-redux-toastr';
import Public from '../views/public/Public';
// #endregion imports

const propTypes = {
	match: PropTypes.shape({})
};
const defaultProps = {
	match: {}
};

const PublicContainer = ({ match }) => (
	<div className="app flex-row">
		<ReduxToastr />
		<Container className="public-threads-container">
			<Public slug={match.params.slug} />
		</Container>
	</div>
);
PublicContainer.propTypes = propTypes;
PublicContainer.defaultProps = defaultProps;
export default PublicContainer;
