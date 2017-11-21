import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	rawFilterData: PropTypes.shape({}).isRequired,
	setFilteredTag: PropTypes.func.isRequired
};

const CharacterFilterSelect = (props) => {
	const { tags, rawFilterData, setFilteredTag } = props;
	const options = [];
	if (tags) {
		for (let i = 0; i < tags.length; i++) {
			const element = <option value={tags[i]} key={tags[i]}>{tags[i]}</option>;
			options.push(element);
		}
	}
	return (
		<FormGroup>
			<Label htmlFor="characterId">Tag</Label>
			<Input
				type="select"
				name="tag"
				id="tag"
				value={rawFilterData.filteredTag}
				onChange={setFilteredTag}
			>
				<option value="">All</option>
				{options}
			</Input>
		</FormGroup>
	);
};

CharacterFilterSelect.propTypes = propTypes;

export default CharacterFilterSelect;
