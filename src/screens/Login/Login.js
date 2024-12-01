import React, { useState } from 'react';
import '../Login/Login.css' // Arquivo CSS para estilização
import { LoginFunction } from '../../utils/FirebaseFunctions';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { Link, useNavigate } from "react-router-dom";

// Componente principal da página de login
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const regexEmail = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$/;//checa email valido
  let navigate = useNavigate();

  const changeScreen = (path) => {
    navigate(path);
  }

  //chamada ao alterar o campo de e-mail
  const setUserEmail = (e) => {
    setEmail(e.target.value);
  };

  //chamada ao alterar o campo de senha
  const setUserPassword = (e) => {
    setPassword(e.target.value);
  };

  //realiza login no firebase ao clickar no botao
  const loginHandle = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (regexEmail.test(email) === true && password !== '') {
      let controlVariable = await LoginFunction({ email, password });
      if (controlVariable) {
        changeScreen(`/banco-de-ideias-certificadora-3/IdeasPage/`);
      } else {
        setErrorMessage("Cadastro não encontrado, verifique o Email ou senha");
      }
      setEmail('');
      setPassword('');
    } else {
      setErrorMessage("Email Invalido");
      setPassword('');
    }
  }

  return (
    <div className="login-page">
      <h1>Bem-vindo(a)</h1>
      <h2>Entre com sua conta!</h2>
      <LoginForm email={email} password={password} setUserEmail={setUserEmail} setUserPassword={setUserPassword} loginHandle={loginHandle} />
      <div>
        <h3 className="error-message">{errorMessage}</h3>
      </div>
      <div>
        <Link to="/banco-de-ideias-certificadora-3/SignPage" className="create-account">Criar conta</Link>
      </div>
    </div>
  );
}

//formulário de login
function LoginForm({ setUserEmail, setUserPassword, loginHandle, email, password }) {
  return (
    <form className="login-form">
      <InputField value={email} className="input-field" label="Email" type="email" onChange={setUserEmail} />
      <InputField value={password} className="input-field" label="Senha" type="password" onChange={setUserPassword} />
      <Button className="default-button" text="Entrar" onClick={loginHandle} />
    </form>
  );
}

export default LoginPage;