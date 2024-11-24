import React from "react";

// Componente de botão
//{ text, onClick}
const Button = (props) => {
    return (
      <button className={props.className} onClick={props.onClick}>{props.text}</button>
    );
}

export default Button;