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
	// holds thread-tracker-specific information about threads, fetched from the tracker backend
	const [trackerThreadData, setTrackerThreads] = useState(/** @type {import("./ThreadContext").TrackerThreadData[]} */([]));
	// holds tumblr-sourced information about threads, fetched from tumblr client backend
	const [tumblrThreadData, setTumblrThreads] = useState(/** @type {import("./ThreadContext").TumblrThreadData[]} */([]));
	const [activeThreadsLoading, setActiveThreadsLoading] = useState(false);
	const activeThreads = [];
	const archivedThreads = [];

	return (
		<ThreadContextProvider
			value={{
				trackerThreadData,
				tumblrThreadData,
				activeThreads,
				archivedThreads,
				fetchActiveThreads,
				fetchArchivedThreads,
				threadsLoading: activeThreadsLoading,
			}}
		>
			{props.children}
		</ThreadContextProvider>
	);

	async function fetchActiveThreads() {
		setActiveThreadsLoading(true);
		/** @type {import('axios').AxiosResponse<TrackerThreadsResponse>} */
		const activeThreadsResponse = await axios.get(`${API_BASE_URL}api/thread`);
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
			setTumblrThreads(threads => [...threads, ...tumblrThreads]);
		});

		await Promise.all(bucketedRequests);
		setActiveThreadsLoading(false);
	}

	function fetchArchivedThreads() {

	}
}
