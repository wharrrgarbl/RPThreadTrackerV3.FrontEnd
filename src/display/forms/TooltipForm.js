// #region imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// #endregion imports

const propTypes = {
	Renderable: PropTypes.func.isRequired
};

class TooltipForm extends Component {
	constructor() {
		super();
		this.showTooltip = this.showTooltip.bind(this);
		this.hideTooltip = this.hideTooltip.bind(this);
		this.state = {
			displayTooltip: {}
		};
	}

	showTooltip(e) {
		const { name } = e.target;
		this.setState(prevState => ({
			displayTooltip: Object.assign({}, prevState.displayTooltip, {
				[name]: true
			})
		}));
	}

	hideTooltip(e) {
		const { name } = e.target;
		this.setState(prevState => ({
			displayTooltip: Object.assign({}, prevState.displayTooltip, {
				[name]: false
			})
		}));
	}

	render() {
		const {
			Renderable
		} = this.props;
		const { displayTooltip } = this.state;
		return (
			<Renderable
				tooltipDisplayData={displayTooltip}
				showTooltip={this.showTooltip}
				hideTooltip={this.hideTooltip}
				{...this.props}
			/>
		);
	}
}

TooltipForm.propTypes = propTypes;
export default TooltipForm;
