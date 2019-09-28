// @ts-check
import { useThreadContext } from "./ThreadContext";
import { useEffect } from "react";

/**
 * TODO
 * 	Archived threads support
 * 	Switch to per-type custom hooks for Dashboard
 *  Figure out where things should live
 * 	Delete unused stuff
 */

/** @param statusFilter {(status: ThreadStatus) => boolean} */
export function useActiveThreads(statusFilter = () => true) {
	const { activeThreads, fetchActiveThreads, tagFilter } = useThreadContext();

	useEffect(() => {
		if (!activeThreads || !activeThreads.length) {
			fetchActiveThreads();
		}
	}, []);

	const threadsFilteredByTag = activeThreads.filter(({ thread }) => {
		if (!tagFilter) {
			return true;
		}

		return thread.threadTags && thread.threadTags.find(tag => tag.tagText === tagFilter);
	});

	const threadsFilteredByStatus = threadsFilteredByTag.filter(({ status }) => {
		if (!status) {
			return false;
		}

		return statusFilter(status);
	});

	return threadsFilteredByStatus
}
