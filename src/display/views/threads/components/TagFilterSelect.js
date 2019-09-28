// @ts-check
import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import CleanSelect from '../../../shared/styled/CleanSelect';
import { useThreadContext } from '~/display/containers/ThreadContext';

const propTypes = {
	tags: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	filteredTag: PropTypes.string,
	setFilteredTag: PropTypes.func.isRequired
};

const defaultProps = {
	filteredTag: undefined
};

const TagFilterSelect = (props) => {
	const { activeThreads, tagFilter, setTagFilter } = useThreadContext();
	/** @type {import('~/display/containers/ThreadContext').ThreadTags[]} */
	const allThreadTags = activeThreads.map(({ thread }) => thread.threadTags)
		.filter(tags => !!tags)
		.flat();

	const uniqueTags = Array.from(new Set(
		allThreadTags.map(tag => tag.tagText)
	));

	const sortedTagList = uniqueTags
		.sort()
		.map(tagText => {
			return allThreadTags.find(tag => tag.tagText === tagText);
		});

	return (
		<FormGroup className="tag-filter-select">
			<CleanSelect>
				<Input
					type="select"
					name="tag"
					id="tag"
					className="clean-select"
					value={tagFilter}
					onChange={e => setTagFilter(e.target.value)}
				>
					<option value="">Filter by Tag</option>
					{sortedTagList.map(tag => (
						<option
							value={tag.tagText}
							key={tag.threadTagId}
						>
							{tag.tagText}
						</option>
					))}
				</Input>
			</CleanSelect>
		</FormGroup>
	);
};

TagFilterSelect.propTypes = propTypes;
TagFilterSelect.defaultProps = defaultProps;
export default TagFilterSelect;
