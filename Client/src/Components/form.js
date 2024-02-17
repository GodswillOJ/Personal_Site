// Form.js
import React from 'react';

const Form = ({ name, setName, state, setState, onSubmit }) => {
  return (
    <div className="CounterCont">
      <form onSubmit={onSubmit} className="Counter_Engine">
        <h1 className="Title">Population Counter</h1>
        <div className="form-group">
          <label>Name:</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>State:</label>
          <input id="state" type="text" value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div>
          <button className="btn1" type="submit">
            Add To Census
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
