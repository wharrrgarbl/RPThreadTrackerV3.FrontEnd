// @ts-check
import React, { useState } from "react";
import { ThreadContextProvider } from "./ThreadContext";
import axios from 'axios';

/**
 * @typedef TrackerThreadsResponse
 * @property threadStatusRequestJson {string}
 * @property threads {TrackerThreadData[]}
*/

export function ThreadProvider(props) {
	const [activeTrackerThreads, setActiveTrackerThreads] = useState(/** @type {TrackerThreadData[]} */([]));
	const [archivedTrackerThreads, setArchivedTrackerThreads] = useState(/** @type {TrackerThreadData[]} */([]));
	const [activeTumblrThreads, setActiveTumblrThreads] = useState(/** @type {ThreadStatus[]} */([]));
	const [archivedTumblrThreads, setArchivedTumblrThreads] = useState(/** @type {ThreadStatus[]} */([]));
	const [activeThreadsLoading, setActiveThreadsLoading] = useState(false);
	const [archivedThreadsLoading, setArchivedThreadsLoading] = useState(false);
	const [pendingThreadUpdates, setPendingThreadUpdates] = useState(/** @type {number[]} */([]));
	const [tagFilter, setTagFilter] = useState('');

	const allActiveThreads = activeTrackerThreads.map(trackerThread => {
		const tumblrThreads = activeTumblrThreads.find(tumblrThread => tumblrThread.threadId === trackerThread.threadId);
		return {
			thread: trackerThread,
			status: tumblrThreads,
		}
	});

	const allArchivedThreads = archivedTrackerThreads.map(trackerThread => {
		const threadStatus = archivedTumblrThreads.find(tumblrThread => tumblrThread.threadId === trackerThread.threadId);
		return {
			thread: trackerThread,
			status: threadStatus,
		}
	});

	const anyThreadsLoading = activeThreadsLoading || archivedThreadsLoading || pendingThreadUpdates.length > 0;

	return (
		<ThreadContextProvider
			value={{
				activeThreads: allActiveThreads,
				archivedThreads: allArchivedThreads,
				fetchActiveThreads,
				fetchArchivedThreads,
				updateThread,
				threadsLoading: anyThreadsLoading,
				tagFilter,
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
		setActiveTumblrThreads([]);
		setActiveTrackerThreads(activeThreadsResponse.data.threads);
		await fetchThreadBuckets(
			activeThreadsResponse.data.threadStatusRequestJson,
			fetchedThreads => setActiveTumblrThreads(threads => [...threads, ...fetchedThreads])
		)

		setActiveThreadsLoading(false);
	}

	async function fetchArchivedThreads() {
		setArchivedThreadsLoading(true);
		/** @type {import('axios').AxiosResponse<TrackerThreadsResponse>} */
		const archivedThreadsResponse = await axios.get(`${API_BASE_URL}api/thread?isArchived=true`);
		setArchivedTumblrThreads([]);
		setArchivedTrackerThreads(archivedThreadsResponse.data.threads);
		await fetchThreadBuckets(
			archivedThreadsResponse.data.threadStatusRequestJson,
			fetchedThreads => setArchivedTumblrThreads(threads => [...threads, ...fetchedThreads])
		)

		setArchivedThreadsLoading(false);
	}

	/** @param updatedThread {TrackerThreadData} */
	async function updateThread(updatedThread) {
		if (pendingThreadUpdates.includes(updatedThread.threadId)) {
			return;
		}

		setPendingThreadUpdates(pendingUpdates => [...pendingUpdates, updatedThread.threadId]);
		await axios.put(`${API_BASE_URL}api/thread/${updatedThread.threadId}`, updatedThread);
		if (activeTrackerThreads.find(activeThread => activeThread.threadId === updatedThread.threadId)) {
			setActiveTrackerThreads(activeThreads => [...activeThreads.filter(activeThread => activeThread.threadId !== updatedThread.threadId), updatedThread]);
		} else {
			setArchivedTrackerThreads(archivedThreads => [...archivedThreads.filter(archivedThread => archivedThread.threadId !== updatedThread.threadId), updatedThread]);
		}

		// TODO if post id changes, might get complicated to sync up tumblr thread data
		// maybe this is where a full refresh happens?

		setPendingThreadUpdates(pendingUpdates => pendingUpdates.filter(id => id !== updatedThread.threadId));
	}
}

/**
 * @param trackerRequestJson {string}
 * @param addThreads {(threads: ThreadStatus[]) => void}
 */
async function fetchThreadBuckets(trackerRequestJson, addThreads) {
	const allRequestChunks = JSON.parse(trackerRequestJson);

	const bucketedRequestChunks = [];
	for (let cursor = 0; cursor < allRequestChunks.length; cursor += 10) {
		bucketedRequestChunks.push(allRequestChunks.slice(cursor, cursor + 10));
	}

	const bucketedRequests = bucketedRequestChunks.map(async chunk => {
		/** @type {import('axios').AxiosResponse<ThreadStatus[]>} */
		const chunkResponse = await axios.post(`${TUMBLR_CLIENT_BASE_URL}api/thread`, chunk);
		const tumblrThreads = chunkResponse.data;
		addThreads(tumblrThreads);
	});

	await Promise.all(bucketedRequests);
}
