// @ts-check
import { useThreadContext } from "./ThreadContext";
import { useEffect } from "react";

/** @param type {'myturn' | 'theirturn' | 'queued' | 'archived' | 'all' } */
export function useThreads(type) {
	const { activeThreads, fetchActiveThreads, tagFilter, threadsLoading } = useThreadContext();

	useEffect(() => {
		if (!activeThreads || !activeThreads.length) {
			fetchActiveThreads();
		}
	}, []);

	const activeFilteredThreads = activeThreads.filter(threadPair => {
		if (!tagFilter) {
			return threadPair;
		}

		return threadPair.thread.threadTags && threadPair.thread.threadTags.find(tag => tag.tagText === tagFilter);
	});

	/** @type {ThreadWithStatus[]} */
	let threads;
	switch (type) {
		case 'myturn':
			threads = activeFilteredThreads.filter(({ status }) => status && status.isCallingCharactersTurn);
			break;
		case 'theirturn':
			threads = activeFilteredThreads.filter(({ status }) => status && !status.isCallingCharactersTurn);
			break;
		case 'queued':
			threads = activeFilteredThreads.filter(({ status }) => status && status.isQueued);
			break;
		case 'archived':
			threads = [];
			break;
		case 'all':
			threads = [];
			break;
		default:
			threads = [];
	}

	return {
		threads,
		loading: threadsLoading
	};
}
