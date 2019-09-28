// @ts-check
import { createContext, useContext } from 'react';

/**
 * @typedef ThreadContext
 * @property activeThreads {ThreadWithStatus[]}
 * @property archivedThreads {ThreadWithStatus[]}
 * @property fetchActiveThreads {() => void}
 * @property fetchArchivedThreads {() => void}
 * @property threadsLoading {boolean}
 * @property tagFilter {string}
 * @property setTagFilter {(filter: string) => void}
 */

 const emptyThreads = /** @type {ThreadWithStatus[]} */ ([]);

/** @type {React.Context<ThreadContext>} */
const Context = createContext({
	activeThreads: emptyThreads,
	archivedThreads: emptyThreads,
	fetchActiveThreads: () => { },
	fetchArchivedThreads: () => { },
	threadsLoading: /** @type {boolean} */ (false),
	tagFilter: '',
	setTagFilter: (_tag) => { },
});

export const ThreadContextProvider = Context.Provider;
export const useThreadContext = () => useContext(Context);
