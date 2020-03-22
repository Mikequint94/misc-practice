
//3 major tests
// snapshot tests. unit validation tests, and making sure error labels appear as expected
import React from 'react';
import FormContainer from '../FormContainer';
import {mount} from 'enzyme';

//snapshot test of form component
it('should render correctly', () => {
  expect(mount(<FormContainer />)).toMatchSnapshot();
});

