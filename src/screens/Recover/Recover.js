import React, { useState } from 'react';
import '../Recover/Recover.css' // Arquivo CSS para estilização
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { Link, useNavigate } from "react-router-dom";
import { RecoverFunction } from '../../utils/FirebaseFunctions';

// Componente principal da página de login
const RecoverPage = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const regexEmail = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$/;//checa email valido
  let navigate = useNavigate();

  //função de mudança de tela
  const changeScreen = (path) => {
    navigate(path);
  }

  //chamada ao alterar o campo de e-mail
  const setUserEmail = (e) => {
    setEmail(e.target.value);
  };

  //realiza login no firebase ao clickar no botao
  const RecoverHandle = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (regexEmail.test(email) === true) {
      let controlVariable = await RecoverFunction({ email });
      if (controlVariable) {
        changeScreen("/banco-de-ideias-certificadora-3/LoginPage");
      } else {
        setErrorMessage("Cadastro não encontrado, verifique o Email.");
      }
      setEmail('');
    } else {
      setErrorMessage("Email Invalido.");
    }
  }

  return (
    <div className="recover-page">
      <h1>Recupere sua conta</h1>
      <RecoverForm email={email} setUserEmail={setUserEmail} RecoverHandle={RecoverHandle} />
      <div>
        <h3 className="error-message">{errorMessage}</h3>
      </div>
      <div>
        <Link to="/banco-de-ideias-certificadora-3/LoginPage" className="link-text">Entrar</Link>
      </div>
    </div>
  );
}

//formulário de recovery
function RecoverForm({ setUserEmail, RecoverHandle, email }) {
  return (
    <form className="recovery-form">
      <InputField value={email} className="input-field" label="Email" type="email" onChange={setUserEmail} />
      <Button className="default-button" text="Recuperar" onClick={RecoverHandle} />
    </form>
  );
}

export default RecoverPage;