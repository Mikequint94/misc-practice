const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

function validateExpYear(value, expirationMonth) {
  if (value.length < 4) {
    return [value, 'Please enter the full expiration year'];
  } else if (value.length > 4) {
    value = value.slice(0,4);
  }

  if (value < currentYear || (expirationMonth && parseInt(value) === currentYear && expirationMonth <= currentMonth)) {
    return [value, 'Please enter an unexpired card'];
  } else {
    return [value, false];
  }
}

function validateExpMonth(value) {
  if (value.length > 2) {
    value = value.slice(0,2);
  }
  if (value < 1 || value > 12) {
    return [value, 'Please enter a valid month from 1-12'];
  }
  return [value, false];
};

function validateName(value) {
  let testValue = value.split(' ');
  if (testValue[0] && testValue.length > 1 && testValue[testValue.length-1]) {
    return [value, false];
  }
  return [value, 'Please enter a valid first and last name'];
};

function validateCardNumber(value) {
  value = value.replace(/\D/g, '');
  let cardType = false;
  if (value.length && value[0] === '4') {
    cardType = 'visa';
  } else if (value.length > 1 && (value.slice(0,2) === '34' || value.slice(0,2) === '37')) {
    cardType = 'amex';
  }
  let formattedNumber = formatCardNumber(value, cardType);
  if (cardType === 'amex' && value.length >= 15) {
    return [formattedNumber, false, cardType];
  } else if (cardType === 'visa' && value.length >= 16) {
    return [formattedNumber, false, cardType];
  }
  if (cardType) {
    return [formattedNumber, 'Please complete your credit card number', cardType];
  } else {
    return [formattedNumber, 'Please enter a valid Visa or AmEx card', cardType];
  }
};

function formatCardNumber(value, cardType) {
  let formattedNumber;
  if (cardType === 'amex') {
    value = value.slice(0,15);
    // Assistance in RegExp from helpful medium blog post
    // https://medium.com/hootsuite-engineering/a-comprehensive-guide-to-validating-and-formatting-credit-cards-b9fa63ec7863
    formattedNumber = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
  } else {
    value = value.slice(0,16);
    formattedNumber = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{4})/, '$1 $2 ').replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
  }
  return formattedNumber;
} 

function validateCVV2(value, cardType) {
  if (!cardType) {
    return [value, 'Please enter a valid card number first'];
  }
  if (cardType === 'visa' && value.length >= 3) {
    value = value.slice(0,3);
    return [value, false];
  } else if (cardType === 'amex' && value.length >= 4) {
    value = value.slice(0,4);
    return [value, false]
  }
  return [value, 'Please enter a valid security code'];
};

const validationMapper = {
  'expirationYear': validateExpYear,
  'expirationMonth': validateExpMonth,
  'name': validateName,
  'cardNumber': validateCardNumber,
  'cvv2': validateCVV2,
};

export const validateField = (field, value, state) => {
  return validationMapper[field](value, state);
};

export const validateForm = (state) => {
  return state.name && state.cardNumber && state.cvv2
    && state.expirationMonth && state.expirationYear.length > 3
    && !state.expirationYearError && !state.expirationMonthError
    && !state.nameError && !state.cardNumberError && !state.cvv2Error;
}
