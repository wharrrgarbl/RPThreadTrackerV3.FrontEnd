// #region imports
import React from 'react';
import { shallow } from 'enzyme';
import { getSpecWrapper } from '../../../../utility/testHelpers';
import ForgotPasswordForm from '../ForgotPasswordForm';
// #endregion imports

const createTestProps = propOverrides => ({
	handleInputChange: jest.fn(),
	...propOverrides
});

describe('rendering', () => {
	it('should render valid snapshot', () => {
		const props = createTestProps();
		const jsx = (<ForgotPasswordForm {...props} />);
		const element = shallow(jsx);
		expect(element).toMatchSnapshot();
	});
});

describe('behavior', () => {
	it('should handle input change for email', () => {
		const handleInputChange = jest.fn();
		const props = createTestProps({ handleInputChange });
		const jsx = (<ForgotPasswordForm {...props} />);
		const element = shallow(jsx);
		const field = getSpecWrapper(element, 'email-field');
		field.simulate('change');
		expect(handleInputChange).toHaveBeenCalledTimes(1);
	});
});
