import React from 'react';

function Name(props) {
  let nameError;
  nameError = props.nameError ? (<div className="error">{props.nameError}</div>) : null

  return (
    <div>
      <input type="text" 
        placeholder="Name"
        name="name"
        value={props.nameValue}
        onChange={props.handleFormChange} />
      {nameError}
    </div>
  );
}

export default Name;
