// #region imports
import React from 'react';
import { shallow } from 'enzyme';
import RecentActivityCard from '../RecentActivityCard';
// #endregion imports

// #region mocks
jest.mock('../RecentActivityRow', () => 'RecentActivityRow');
jest.mock('../../NoThreadsMessage', () => 'NoThreadsMessage');
jest.mock('../../NoCharactersMessage', () => 'NoCharactersMessage');
jest.mock('../../NoRecentActivityMessage', () => 'NoRecentActivityMessage');
jest.mock('../../../../../shared/LoadingIndicator', () => 'LoadingIndicator');
// #endregion mocks

const createTestProps = propOverrides => ({
	allThreads: [],
	archiveThread: jest.fn(),
	characters: [],
	loadingInProgress: false,
	markThreadQueued: jest.fn(),
	openUntrackThreadModal: jest.fn(),
	recentActivityThreads: [],
	...propOverrides
});
const createTestPropsLoading = () => createTestProps({ loadingInProgress: true });
const createTestPropsNoCharacters = () => createTestProps({});
const createTestPropsNoThreads = () => createTestProps({ characters: [{}, {}] });
const createTestPropsNoRecentActivity = () =>
	createTestProps({ characters: [{}, {}], allThreads: [{}, {}, {}] });
const createTestPropsRecentActivity = () =>
	createTestProps({ characters: [{}, {}], allThreads: [{}, {}, {}], recentActivityThreads: [{ thread: { threadId: 1, userTitle: 'Recent 1' } }, { thread: { threadId: 2, userTitle: 'Recent 2' } }] });

describe('rendering', () => {
	describe('snapshots', () => {
		it('should render valid snapshot when threads are loading', () => {
			const element = shallow(<RecentActivityCard {...createTestPropsLoading()} />);
			expect(element).toMatchSnapshot();
		});
		it('should render valid snapshot when user has no characters', () => {
			const element = shallow(<RecentActivityCard {...createTestPropsNoCharacters()} />);
			expect(element).toMatchSnapshot();
		});
		it('should render valid snapshot when user has no threads', () => {
			const element = shallow(<RecentActivityCard {...createTestPropsNoThreads()} />);
			expect(element).toMatchSnapshot();
		});
		it('should render valid snapshot when user has no recent activity', () => {
			const element = shallow(<RecentActivityCard	{...createTestPropsNoRecentActivity()} />);
			expect(element).toMatchSnapshot();
		});
		it('should render valid snapshot when user has recent activity', () => {
			const element = shallow(<RecentActivityCard {...createTestPropsRecentActivity()} />);
			expect(element).toMatchSnapshot();
		});
	});
});
