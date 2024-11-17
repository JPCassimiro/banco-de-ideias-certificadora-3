import React from "react";

// Componente de botão
//{ text, onClick}
const Button = (props) => {
    return (
      <button className="default-button" onClick={props.onClick}>{props.text}</button>
    );
}

export default Button;