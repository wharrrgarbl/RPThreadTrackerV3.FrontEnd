// @ts-check
import React, { useState } from "react";
import { ThreadContextProvider } from "./ThreadContext";
import axios from 'axios';
// import produce from 'immer';

/**
 * @typedef TrackerThreadsResponse
 * @property threadStatusRequestJson {string}
 * @property threads {import("./ThreadContext").TrackerThreadData[]}
*/

export function ThreadProvider(props) {
	const [trackerThreadData, setTrackerThreads] = useState(/** @type {import("./ThreadContext").TrackerThreadData[]} */([]));
	const [threadStatusData, setThreadStatuses] = useState(/** @type {import("./ThreadContext").TumblrThreadData[]} */([]));
	const [activeThreadsLoading, setActiveThreadsLoading] = useState(false);
	const [tagFilter, setTagFilter] = useState('');
	const allActiveThreads = trackerThreadData.map(trackerThread => {
		const threadStatus = threadStatusData.find(threadStatus => threadStatus.threadId === trackerThread.threadId);
		return {
			thread: trackerThread,
			status: threadStatus,
		}
	});

	const activeFilteredThreads = allActiveThreads.filter(threadPair => {
		if (!tagFilter) {
			return threadPair;
		}

		return threadPair.thread.threadTags && threadPair.thread.threadTags.find(tag => tag.tagText === tagFilter);
	});

	return (
		<ThreadContextProvider
			value={{
				activeThreads: allActiveThreads,
				activeFilteredThreads,
				archivedThreads: [],
				fetchActiveThreads,
				fetchArchivedThreads,
				threadsLoading: activeThreadsLoading,
				setTagFilter
			}}
		>
			{props.children}
		</ThreadContextProvider>
	);

	async function fetchActiveThreads() {
		setActiveThreadsLoading(true);
		/** @type {import('axios').AxiosResponse<TrackerThreadsResponse>} */
		const activeThreadsResponse = await axios.get(`${API_BASE_URL}api/thread`);
		setThreadStatuses([]);
		setTrackerThreads(activeThreadsResponse.data.threads);
		const allRequestChunks = JSON.parse(activeThreadsResponse.data.threadStatusRequestJson);
		const bucketedRequestChunks = [];
		for (let cursor = 0; cursor < allRequestChunks.length; cursor += 10) {
			bucketedRequestChunks.push(allRequestChunks.slice(cursor, cursor + 10));
		}

		const bucketedRequests = bucketedRequestChunks.map(async chunk => {
			/** @type {import('axios').AxiosResponse<import("./ThreadContext").TumblrThreadData[]>} */
			const chunkResponse = await axios.post(`${TUMBLR_CLIENT_BASE_URL}api/thread`, chunk);
			const tumblrThreads = chunkResponse.data;
			setThreadStatuses(threads => [...threads, ...tumblrThreads]);
		});

		await Promise.all(bucketedRequests);
		setActiveThreadsLoading(false);
	}

	function fetchArchivedThreads() {

	}
}
