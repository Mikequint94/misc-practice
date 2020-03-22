import React from 'react';
import CardNumber from '../fields/CardNumber';
import {mount} from 'enzyme';


it('should render passed error message', () => {
  const errorMessage = 'Please enter a valid visa or amex card';
  const wrapper = mount(<CardNumber cardNumberError={errorMessage}/>);
  expect(wrapper.find('.error').text()).toEqual(errorMessage);
});

it('should be empty when no error is passed', () => {
  const wrapper = mount(<CardNumber cvv2Error={false}/>);
  expect(wrapper.find('.error').exists()).toBeFalsy();
});
