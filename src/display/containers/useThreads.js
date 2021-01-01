// @ts-check
import { useThreadContext } from "./ThreadContext";
import { useEffect } from "react";

export function useRecentThreads() {
	let threads = useActiveThreads(thread => thread.isCallingCharactersTurn && !thread.isQueued);
	threads.sort((a, b) => {
		/* istanbul ignore if */
		if (!a.status && !b.status) {
			return 0;
		}
		/* istanbul ignore if */
		if (!a.status) {
			return 1;
		}
		/* istanbul ignore if */
		if (!b.status) {
			return -1;
		}

		return new Date(b.status.lastPostDate).getTime() - new Date(a.status.lastPostDate).getTime()
	});

	return threads.slice(0, 5);
}

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

export function useArchivedThreads() {
	const { archivedThreads, fetchArchivedThreads, tagFilter } = useThreadContext();

	useEffect(() => {
		if (!archivedThreads || !archivedThreads.length) {
			fetchArchivedThreads();
		}
	}, []);

	const threadsFilteredByTag = archivedThreads.filter(({ thread }) => {
		if (!tagFilter) {
			return true;
		}

		return thread.threadTags && thread.threadTags.find(tag => tag.tagText === tagFilter);
	});

	return threadsFilteredByTag
}
