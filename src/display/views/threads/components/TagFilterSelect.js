// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input } from 'reactstrap';
import CleanSelect from '../../../shared/styled/CleanSelect';
import { useThreadContext } from '~/display/containers/ThreadContext';

const propTypes = {
	archived: PropTypes.bool,
};

/** @param props {{ isArchive?: boolean }} */
const TagFilterSelect = ({ isArchive }) => {
	const { activeThreads, archivedThreads, tagFilter, setTagFilter } = useThreadContext();
	const effectiveThreads = isArchive ? archivedThreads : activeThreads;

	/** @type {ThreadTags[]} */
	const allThreadTags = effectiveThreads.map(({ thread }) => thread.threadTags)
		.filter(tags => !!tags)
		// @ts-ignore
		.flat();

	const uniqueTags = Array.from(new Set(
		allThreadTags.map(tag => tag.tagText)
	));

	const sortedThreadTags = uniqueTags
		.sort()
		.map(tagText => {
			return /** @type {ThreadTags} */ (allThreadTags.find(tag => tag.tagText === tagText));
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
					{sortedThreadTags.map(tag => (
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
export default TagFilterSelect;
