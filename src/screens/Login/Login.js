// export default App;
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
  const regexEmail = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$/;

  let navigate = useNavigate();

  const ChangeScreen = (path) =>{
    navigate(path);
  }

  // Função chamada ao alterar o campo de e-mail
  const setUserEmail = (e) => {
    setEmail(e.target.value);
  };

  // Função chamada ao alterar o campo de senha
  const setUserPassword = (e) => {
    setPassword(e.target.value);
  };

  const loginHandle = async (e) => {
    e.preventDefault();
    if(regexEmail.test(email) === true && password !== ''){
      let controlVariable = await LoginFunction({email,password});
      if(controlVariable){
        ChangeScreen(`/banco-de-ideias-cetificadora-3/IdeasPage/`);
      }
      setEmail('');
      setPassword('');
    }
  }

  return (
    <div className="login-page">
      <h1>Bem-vinda</h1>
      <h2>Entre com sua conta!</h2>
      <LoginForm setUserEmail={setUserEmail} setUserPassword={setUserPassword} loginHandle={loginHandle} />
      <div>
       <Link to="/banco-de-ideias-cetificadora-3/SignPage" className="create-account">Criar conta</Link>
      </div>
    </div>
  );
}

// Componente de formulário de login
function LoginForm({ setUserEmail, setUserPassword, loginHandle, goToSignScreen }) {
  return (
    <form className="login-form">
      <InputField className="input-field" label="Email" type="email" onChange={setUserEmail} />
      <InputField className="input-field" label="Senha" type="password" onChange={setUserPassword} />
      <Button className="default-button" text="Entrar" onClick={loginHandle} />
    </form>
  );
}

export default LoginPage;