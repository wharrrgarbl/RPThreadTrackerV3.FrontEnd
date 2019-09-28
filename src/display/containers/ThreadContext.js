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
 * @typedef ThreadTags
 * @property threadTagId {string}
 * @property tagText {string}
 * @property threadId {number}
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
 * @property threadTags {ThreadTags[]}
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
 * @typedef ThreadWithStatus
 * @property thread {TrackerThreadData}
 * @property status {TumblrThreadData}
 */

/**
 * @typedef ThreadContext
 * @property activeThreads {ThreadWithStatus[]}
 * @property activeFilteredThreads {ThreadWithStatus[]}
 * @property archivedThreads {ThreadWithStatus[]}
 * @property fetchActiveThreads {() => void}
 * @property fetchArchivedThreads {() => void}
 * @property threadsLoading {boolean}
 * @property tagFilter {string}
 * @property setTagFilter {(filter: string) => void}
 */

/** @type {React.Context<ThreadContext>} */
const Context = createContext({
	activeThreads: [],
	activeFilteredThreads: [],
	archivedThreads: [],
	fetchActiveThreads: () => { },
	fetchArchivedThreads: () => { },
	threadsLoading: /** @type {boolean} */ (false),
	tagFilter: '',
	setTagFilter: (_tag) => { },
});

export const ThreadContextProvider = Context.Provider;
export const useThreadContext = () => useContext(Context);
