import React from 'react';

function ExpirationDate(props) {
  let monthError;
  let yearError;
  monthError = props.monthError ? (<div id="monthError" className="error">{props.monthError}</div>) : <div className="error"/>
  yearError = props.yearError ? (<div id="yearError" className="error">{props.yearError}</div>) : <div/>
  return (
    <div>
      <div className="expiration">
        <input type="number" 
        placeholder="Exp. Month"
        name="expirationMonth"
        value={props.monthValue}
        onChange={props.handleFormChange} />
        <input type="number" 
        placeholder="Exp. Year"
        name="expirationYear"
        value={props.yearValue}
        onChange={props.handleFormChange} />
        
      </div>
      <div className="expiration-errors">
        {monthError}
        {yearError}
      </div>
    </div>
  );
}
export default ExpirationDate;

