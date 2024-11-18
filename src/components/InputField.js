import React from "react";

// Componente de campo de entrada
//{ label, type, onChange, value }
const InputField = (props) => {
    return (
      <div className={props.className}>
        <label>{props.label}</label>
        <input value={props.value} name={props.name} type={props.type} onChange={props.onChange} required/>
      </div>
    );
}

export default InputField