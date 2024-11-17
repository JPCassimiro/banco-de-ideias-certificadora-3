import React from "react";

// Componente de campo de entrada
//{ label, type, onChange }
const InputField = (props) => {
    return (
      <div className={props.className}>
        <label>{props.label}</label>
        <input name={props.name} type={props.type} onChange={props.onChange} />
      </div>
    );
}

export default InputField