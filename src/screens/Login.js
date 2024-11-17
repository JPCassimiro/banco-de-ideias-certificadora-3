// export default App;
import React, { useState } from 'react';
import '../screens/Login.css' // Arquivo CSS para estilização
import { LoginFunction } from '../utils/FirebaseFunctions';
import Button from '../components/Button';
import InputField from '../components/InputField';

// Componente principal da página de login
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const regexEmail = /^[A-Za-z0-9.+_-]+@alunos\.utfpr\.edu\.br$/;


  // Função chamada ao alterar o campo de e-mail
  const setUserEmail = (e) => {
    setEmail(e.target.value);
  };

  // Função chamada ao alterar o campo de senha
  const setUserPassword = (e) => {
    setPassword(e.target.value);
  };

  const loginHandle = (e) => {
    e.preventDefault();
    console.log(email,password);
    if(regexEmail.test(email) === true && password !== ''){
        LoginFunction({email,password});
        setEmail('');
        setPassword('');
    }else{
      console.log("Use um Email institucional");
    }
    console.log(email,password);
  }

  return (
    <div className="login-page">
      <h1>Bem-vindo</h1>
      <LoginForm setUserEmail={setUserEmail} setUserPassword={setUserPassword} loginHandle={loginHandle} />
    </div>
  );
}

// Componente de formulário de login
function LoginForm({ setUserEmail, setUserPassword, loginHandle }) {
  return (
    <form className="login-form">
      <InputField label="Usuário" type="email" onChange={setUserEmail} />
      <InputField label="Senha" type="password" onChange={setUserPassword} />
      <Button text="Entrar" onClick={loginHandle} />
    </form>
  );
}

export default LoginPage;