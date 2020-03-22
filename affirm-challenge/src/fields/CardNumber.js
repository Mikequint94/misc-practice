import React from 'react';

function CardNumber(props) {
  let cardNumberError;
  cardNumberError = props.cardNumberError ? (<div className="error">{props.cardNumberError}</div>) : null

  
  return (
    <div>
      <input type="text" 
      placeholder="Card Number"
      name="cardNumber"
      value={props.cardNumberValue}
      onChange={props.handleFormChange} />
      {cardNumberError}
    </div>
  );
}
export default CardNumber;

