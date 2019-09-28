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
 * @property status {TumblrThreadData=}
 */
