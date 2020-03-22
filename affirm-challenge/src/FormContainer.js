import React, { Component } from 'react';
import Name from './fields/Name';
import CardNumber from './fields/CardNumber';
import CVV2 from './fields/CVV2';
import ExpirationDate from './fields/ExpirationDate';
import visaLogo from './images/visa-icon.png';
import amexLogo from './images/amex-icon.png';
import * as validations from './validations';

const fieldErrorMapper = {
  'expirationYear': 'expirationYearError',
  'expirationMonth': 'expirationMonthError',
  'name': 'nameError',
  'cardNumber': 'cardNumberError',
  'cvv2': 'cvv2Error'
}

class FormContainer extends Component {
  constructor(){
    super();
    this.state={
      name: '',
      cardNumber: '',
      cvv2: '',
      expirationMonth: '',
      expirationYear: '',
      expirationYearError: false,
      expirationMonthError: false,
      nameError: false,
      cardNumberError: false,
      cvv2Error: false,
      formValid: false,
      cardType: false
    };
  }

  handleFormChange = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    let validationResult;
    let validationResultYear;
    if (field === 'cvv2') {
      validationResult = validations.validateField(field, value, this.state.cardType);
    } else if (field === 'expirationYear') {
      validationResult = validations.validateField(field, value, this.state.expirationMonth);
    } else {
      validationResult = validations.validateField(field, value);
    }
    if (field === 'cardNumber') {
      this.setState({cardType: validationResult[2]})
    }
    // if you change the month, you must re-check the year validator also to see if you are in bounds;
    if (field === 'expirationMonth') {
      validationResultYear = validations.validateField('expirationYear', this.state.expirationYear, validationResult[0]);
      this.setState({
        [fieldErrorMapper['expirationYear']]: validationResultYear[1],
        expirationYear: validationResultYear[0],
        [fieldErrorMapper[field]]: validationResult[1],
        [field]: validationResult[0]
      }, () => this.checkValidForm())
    } else {
      this.setState({
        [fieldErrorMapper[field]]: validationResult[1],
        [field]: validationResult[0],
      }, () => this.checkValidForm());
    }
  }

  checkValidForm = () => {
    this.setState({formValid: validations.validateForm(this.state)});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    alert('Thank you for submitting your information!');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='container'>
        Please Enter Your Information Below
        <Name
          nameValue={this.state.name}
          nameError={this.state.nameError}
          handleFormChange={this.handleFormChange}/>
        <CardNumber
          cardNumberValue={this.state.cardNumber}
          cardNumberError={this.state.cardNumberError}
          handleFormChange={this.handleFormChange}/>
        <CVV2
          cvv2Value={this.state.cvv2}
          cvv2Error={this.state.cvv2Error}
          handleFormChange={this.handleFormChange}/>
        <ExpirationDate
          yearValue={this.state.expirationYear}
          monthValue={this.state.expirationMonth}
          yearError={this.state.expirationYearError}
          monthError={this.state.expirationMonthError}
          handleFormChange={this.handleFormChange}/>
        <div className="logos">
          <img className={this.state.cardType === 'visa' ? 'selected' : ''} src={visaLogo} alt="Visa Logo"/>
          <img className={this.state.cardType === 'amex' ? 'selected' : ''} src={amexLogo} alt="Amex Logo"/>
        </div>
        <input disabled={!this.state.formValid} className="submit" type="submit" value="Submit" />
      </form>
    );
  }
}

export default FormContainer;
