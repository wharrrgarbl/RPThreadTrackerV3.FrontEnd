import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, FormGroup } from 'reactstrap';
import { AvField } from 'availity-reactstrap-validation';
import Tooltip from 'rc-tooltip';
import MultipleValueTextInput from 'react-multivalue-text-input';
import CharacterSelect from '../../shared/character-select/CharacterSelect';

const propTypes = {
	threadToEdit: PropTypes.shape({}).isRequired,
	characters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	showTooltip: PropTypes.func.isRequired,
	hideTooltip: PropTypes.func.isRequired,
	selectCharacter: PropTypes.func.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	validator: PropTypes.shape({}).isRequired,
	formData: PropTypes.shape({}).isRequired,
	tooltipDisplayData: PropTypes.shape({}).isRequired,
	handleTagAdded: PropTypes.func.isRequired,
	handleTagRemoved: PropTypes.func.isRequired,
	tagValues: PropTypes.arrayOf(PropTypes.string).isRequired
};

const UpsertThreadForm = (props) => {
	const {
		threadToEdit,
		characters,
		showTooltip,
		hideTooltip,
		selectCharacter,
		handleInputChange,
		validator,
		formData,
		tooltipDisplayData,
		handleTagAdded,
		handleTagRemoved,
		tagValues
	} = props;
	return (
		<div>
			<FormGroup row>{/* character selector */}
				<Col>
					<CharacterSelect
						characters={characters}
						selectedCharacterId={threadToEdit.characterId}
						onSelectCharacter={selectCharacter}
						includeNullValue={false}
					/>
				</Col>
			</FormGroup>
			<Row> {/* thread title */}
				<Col>
					<AvField
						name="userTitle"
						placeholder="Thread Title"
						label="Thread Title"
						type="text"
						value={threadToEdit.userTitle}
						onChange={handleInputChange}
						validate={validator.userTitle}
						helpMessage={formData.userTitle.helpMessage}
					/>
				</Col>
			</Row>
			<Row> {/* thread post ID */}
				<Col>
					<AvField
						name="postId"
						placeholder="Post ID"
						label="Post ID"
						type="text"
						onChange={handleInputChange}
						validate={validator.postId}
						value={threadToEdit.postId}
						helpMessage={formData.postId.helpMessage}
					/>
				</Col>
			</Row>
			<Row> {/* partner url identifier */}
				<Col>
					<Tooltip
						visible={tooltipDisplayData.partnerUrlIdentifier}
						overlay={formData.partnerUrlIdentifier.tooltip}
						overlayStyle={{ width: 300 }}
						align={{
							offset: [0, 30]
						}}
						placement="top"
					>
						<AvField
							name="partnerUrlIdentifier"
							placeholder="Partner Url Identifier"
							label="Partner URL Identifier (Optional)"
							type="text"
							onChange={handleInputChange}
							validate={validator.partnerUrlIdentifier}
							value={threadToEdit.partnerUrlIdentifier}
							helpMessage={formData.partnerUrlIdentifier.helpMessage}
							onFocus={showTooltip}
							onBlur={hideTooltip}
						/>
					</Tooltip>
				</Col>
			</Row>
			{/* tags */}
			<Row>
				<Col>
					<FormGroup>
						<MultipleValueTextInput
							values={tagValues}
							onItemAdded={handleTagAdded}
							onItemDeleted={handleTagRemoved}
							label="Thread Tags"
							name="threadTags"
							placeholder="Thread Tags"
							className="form-control"
							labelClassName="form-control-label"
						/>
						<small className="form-text">{formData.threadTags.helpMessage}</small>
					</FormGroup>
				</Col>
			</Row>
		</div>
	);
};

UpsertThreadForm.propTypes = propTypes;
export default UpsertThreadForm;
