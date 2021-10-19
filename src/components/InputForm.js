import React, { useState } from "react";

export const InputForm = (props) => {
  const [value, setValue] = useState({
    input: "",
  });

  const handleInputChange = (e) => {
    setValue({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(value);
    props.addTask(value);
  };

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese el nombre del texto"
          name="input"
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary btn-block">Save</button>
    </form>
  );
};
