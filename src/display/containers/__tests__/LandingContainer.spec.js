// #region imports
import React from 'react';
import { shallow } from 'enzyme';
import { initMockDateNow } from '../../../../config/tests/helpers.unit';
import LandingContainer from '../LandingContainer';
// #endregion imports

jest.mock('../../../infrastructure/withPageViewTracker', () => WrappedComponent => WrappedComponent);
jest.mock('../../views/landing/Landing', () => 'Landing');

initMockDateNow();
describe('rendering', () => {
	describe('snapshots', () => {
		it('should render valid snapshot', () => {
			const jsx = (<LandingContainer />);
			const element = shallow(jsx);
			expect(element).toMatchSnapshot();
		});
	});
});
