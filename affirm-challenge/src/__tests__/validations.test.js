import {validateField, validateForm} from '../validations';

// Name validations
it('validates the name field with a valid name', () => {
  expect(validateField('name','Michael Quint')[1]).toBeFalsy();
  expect(validateField('name','Michael Jesse Quint')[1]).toBeFalsy();
});
it('validates the name field with an invalid name', () => {
  expect(validateField('name','Michael')[1]).toBeTruthy();
  expect(validateField('name','')[1]).toBeTruthy();
});

// Card number validations
it('validates the card number field with a valid visa', () => {
  expect(validateField('cardNumber','4123456789123456')[1]).toBeFalsy();
  expect(validateField('cardNumber','4123456789123456')[2]).toEqual('visa');
});
it('validates the card number field with a valid amex', () => {
  expect(validateField('cardNumber','372345678912345')[1]).toBeFalsy();
  expect(validateField('cardNumber','372345678912345')[2]).toEqual('amex');
});
it('validates the card number field with an invalid card', () => {
  expect(validateField('cardNumber','37234567891234')[1]).toBeTruthy();
  expect(validateField('cardNumber','5552345678912345')[1]).toBeTruthy();
  expect(validateField('cardNumber','5552345678912345')[2]).toBeFalsy();
  expect(validateField('cardNumber','4')[1]).toBeTruthy();
  expect(validateField('cardNumber','4444')[1]).toBeTruthy();
});

// Security code validations
it('validates the security code field with a valid cvv2 for visa', () => {
  expect(validateField('cvv2','123', 'visa')[1]).toBeFalsy();
});
it('validates the security code field with a valid cvv2 for amex', () => {
  expect(validateField('cvv2','1234', 'amex')[1]).toBeFalsy();
});
it('validates the security code field with an invalid cvv2 due to invalid card type', () => {
  expect(validateField('cvv2','1234')[1]).toBeTruthy();
  expect(validateField('cvv2','123')[1]).toBeTruthy();
});
it('validates the security code field with an invalid cvv2', () => {
  expect(validateField('cvv2','12', 'amex')[1]).toBeTruthy();
  expect(validateField('cvv2','', 'visa')[1]).toBeTruthy();
});

//Expiration month validations
it('validates the expiration month with a valid month number', () => {
  expect(validateField('expirationMonth','12')[1]).toBeFalsy();
  expect(validateField('expirationMonth','01')[1]).toBeFalsy();
  expect(validateField('expirationMonth','1')[1]).toBeFalsy();
});
it('validates the expiration month with an invalid month number', () => {
  expect(validateField('expirationMonth','0')[1]).toBeTruthy();
  expect(validateField('expirationMonth','')[1]).toBeTruthy();
  expect(validateField('expirationMonth','13')[1]).toBeTruthy();
});

//Expiration year validations
it('validates the expiration year with a valid year/month combination', () => {
  expect(validateField('expirationYear','2020', '3')[1]).toBeFalsy();
  expect(validateField('expirationYear','2019', '3')[1]).toBeFalsy();
});
it('validates the expiration year with an invalid year', () => {
  expect(validateField('expirationYear','999')[1]).toBeTruthy();
  expect(validateField('expirationYear','0')[1]).toBeTruthy();
});
it('validates the expiration year with an invalid year/month combination', () => {
  expect(validateField('expirationYear','2019', '2')[1]).toBeTruthy();
  expect(validateField('expirationYear','2018', '12')[1]).toBeTruthy();
});

//Form validator validations
it('validates the entire form is valid when all inputs are correct', () => {
  const goodState = {
    name: 'Jane Doe',
    cardNumber: '4444444444444444',
    cvv2: '123',
    expirationMonth: '10',
    expirationYear: '2019',
    expirationYearError: false,
    expirationMonthError: false,
    nameError: false,
    cardNumberError: false,
    cvv2Error: false,
    formValid: false
  }
  expect(validateForm(goodState)).toBeTruthy();
});
it('validates the entire form is invalid when an error exists', () => {
  const badState = {
    name: 'Jane Doe',
    cardNumber: '444444444444444',
    cvv2: '123',
    expirationMonth: '10',
    expirationYear: '2019',
    expirationYearError: false,
    expirationMonthError: false,
    nameError: false,
    cardNumberError: true,
    cvv2Error: false,
    formValid: false
  }
  expect(validateForm(badState)).toBeFalsy();
});
it('validates the entire form is invalid when an input is missing', () => {
  const badState = {
    name: 'Jane Doe',
    cardNumber: '444444444444444',
    cvv2: '',
    expirationMonth: '10',
    expirationYear: '2019',
    expirationYearError: false,
    expirationMonthError: false,
    nameError: false,
    cardNumberError: true,
    cvv2Error: false,
    formValid: false
  }
  expect(validateForm(badState)).toBeFalsy();
});