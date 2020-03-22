import React from 'react';

function CVV2(props) {
  let cvv2Error;
  cvv2Error = props.cvv2Error ? (<div className="error">{props.cvv2Error}</div>) : null
  
  return (
    <div>
      <input type="number" 
      placeholder="CVV2"
      name="cvv2"
      value={props.cvv2Value}
      onChange={props.handleFormChange} />
      {cvv2Error}
    </div>
  );
}
export default CVV2;

