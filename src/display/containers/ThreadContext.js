// @ts-check
import { createContext, useContext } from 'react';

/**
 * @typedef Character
 * @property characterId {string}
 * @property characterName {string}
 * @property homeUrl {string}
 * @property isOnHiatus {boolean}
 * @property platformId {number}
 * @property urlIdentifier {string}
 * @property userId {string}
 */

/**
 * @typedef TrackerThreadData
 * @property character {Character}
 * @property characterId {number}
 * @property dateMarkedQueued {string}
 * @property description {string}
 * @property isArchived {boolean}
 * @property partnerUrlIdentifier {string}
 * @property postId {string}
 * @property threadHomeUrl {string}
 * @property threadId {number}
 * @property threadTags {string[]}
 * @property userTitle {string}
 */

/**
 * @typedef TumblrThreadData
 * @property isCallingCharactersTurn {boolean}
 * @property isQueued {boolean}
 * @property lastPostDate {string}
 * @property lastPostUrl {string}
 * @property lastPosterUrlIdentifier {string}
 * @property postId {string}
 * @property threadId {number}
 */

/**
 * Merged thread data from tracker and tumblr
 * @typedef Thread
 * @property whoknows {number}
 */

/**
 * @typedef ThreadContext
 * @property trackerThreadData {TrackerThreadData[]}
 * @property tumblrThreadData {TumblrThreadData[]}
 * @property activeThreads {Thread[]}
 * @property archivedThreads {Thread[]}
 * @property fetchActiveThreads {() => void}
 * @property fetchArchivedThreads {() => void}
 * @property threadsLoading {boolean}
 */

/** @type {React.Context<ThreadContext>} */
const Context = createContext({
	trackerThreadData: [],
	tumblrThreadData: [],
	activeThreads: [],
	archivedThreads: [],
	fetchActiveThreads: () => { },
	fetchArchivedThreads: () => { },
	/** @type {boolean} */
	threadsLoading: false,
});

export const ThreadContextProvider = Context.Provider;
export const useThreadContext = () => useContext(Context);
