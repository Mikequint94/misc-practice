import React from 'react';
import CVV2 from '../fields/CVV2';
import {mount} from 'enzyme';


it('should render passed error message', () => {
  const errorMessage = 'Please enter a valid security code';
  const wrapper = mount(<CVV2 cvv2Error={errorMessage}/>);
  expect(wrapper.find('.error').text()).toEqual(errorMessage);
});

it('should be empty when no error is passed', () => {
  const wrapper = mount(<CVV2 cvv2Error={false}/>);
  expect(wrapper.find('.error').exists()).toBeFalsy();
});
