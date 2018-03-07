import React, { Component } from 'react';
import {
	Row, Col
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CurrentCharacterTable from './components/CurrentCharacterTable';
import { openUpsertCharacterModal, fetchCharacters, upsertCharacter } from '../../../infrastructure/actions';

const propTypes = {
	characters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	const {
		characters,
		ui,
		characterToEdit
	} = state;
	return {
		characters,
		isUpsertCharacterModal: ui.isUpsertCharacterModal,
		characterToEdit
	};
}

class ManageCharacters extends Component {
	constructor(props) {
		super(props);
		this.openUpsertCharacterModal = this.openUpsertCharacterModal.bind(this);
		this.toggleCharacterIsOnHiatus = this.toggleCharacterIsOnHiatus.bind(this);
	}
	componentDidMount() {
		const { dispatch } = this.props;
		if (!this.props.characters || !this.props.characters.length) {
			dispatch(fetchCharacters());
		}
	}

	openUpsertCharacterModal(character) {
		const { dispatch } = this.props;
		dispatch(openUpsertCharacterModal(character));
	}

	toggleCharacterIsOnHiatus(character) {
		const { dispatch } = this.props;
		const updatedCharacter = {
			...character, isOnHiatus: !character.isOnHiatus
		};
		dispatch(upsertCharacter(updatedCharacter));
	}

	render() {
		const {
			characters
		} = this.props;
		return (
			<div className="animated fadeIn dashboard-container">
				<Row>
					<Col>
						<CurrentCharacterTable
							characters={characters}
							openUpsertCharacterModal={this.openUpsertCharacterModal}
							toggleCharacterIsOnHiatus={this.toggleCharacterIsOnHiatus}
						/>
					</Col>
				</Row>
			</div >
		);
	}
}

ManageCharacters.propTypes = propTypes;
export default connect(mapStateToProps)(ManageCharacters);
