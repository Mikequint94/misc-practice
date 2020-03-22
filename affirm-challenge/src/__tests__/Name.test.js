import React from 'react';
import Name from '../fields/Name';
import {mount} from 'enzyme';


it('should render passed error message', () => {
  const errorMessage = 'Please enter a valid first and last name';
  const wrapper = mount(<Name nameError={errorMessage}/>);
  expect(wrapper.find('.error').text()).toEqual(errorMessage);
});

it('should be empty when no error is passed', () => {
  const wrapper = mount(<Name nameError={false}/>);
  expect(wrapper.find('.error').exists()).toBeFalsy();
});
