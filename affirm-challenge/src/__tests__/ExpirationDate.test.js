import React from 'react';
import ExpirationDate from '../fields/ExpirationDate';
import {mount} from 'enzyme';

//Expiration Month
it('should render passed error message for month', () => {
  const errorMessage = 'Please enter a valid month from 1-12';
  const wrapper = mount(<ExpirationDate monthError={errorMessage}/>);
  expect(wrapper.find('#monthError.error').text()).toEqual(errorMessage);
});

it('should be empty when no month error is passed', () => {
  const wrapper = mount(<ExpirationDate monthError={false}/>);
  expect(wrapper.find('#monthError.error').exists()).toBeFalsy();
});

//Expiration Year
it('should render passed error message for year', () => {
  const errorMessage = 'Please enter an unexpired card';
  const wrapper = mount(<ExpirationDate yearError={errorMessage}/>);
  expect(wrapper.find('#yearError.error').text()).toEqual(errorMessage);
});

it('should be empty when no year error is passed', () => {
  const wrapper = mount(<ExpirationDate yearError={false}/>);
  expect(wrapper.find('#yearError.error').exists()).toBeFalsy();
});
