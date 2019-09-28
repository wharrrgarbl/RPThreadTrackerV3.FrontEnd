// @ts-check
import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import CleanSelect from '../../../shared/styled/CleanSelect';
import { useThreadContext } from '~/display/containers/ThreadContext';

const TagFilterSelect = () => {
	const { activeThreads, tagFilter, setTagFilter } = useThreadContext();
	/** @type {ThreadTags[]} */
	const allThreadTags = activeThreads.map(({ thread }) => thread.threadTags)
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

export default TagFilterSelect;
