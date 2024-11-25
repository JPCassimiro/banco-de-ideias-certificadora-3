import React, { useState } from "react";
import { SingUpFunction } from "../../utils/FirebaseFunctions";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import "../Sign/Sign.css"


const SignPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();
    const regexEmail = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$/;//checa email valido


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

    //chamada ao alterar o campo de nome
    const setUserName = (e) => {
        setName(e.target.value);
    };

    //chamada ao alterar o tipo 
    const setUserType = (e) => {
        console.log(e.target.value);
        setType(e.target.value);
    };

    //realiza o cadastro no firebase 
    const signUpHandle = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (regexEmail.test(email) === true && password !== '') {
            if (await SingUpFunction({ email, password, name, type })) {
                changeScreen("/banco-de-ideias-cetificadora-3/LoginPage");
            } else {
                setErrorMessage("Erro ao fazer cadastro");
            }
            setEmail('');
            setPassword('');
            setName('');
            setType('');
        } else {
            setErrorMessage("Email Invalido");
            setPassword('');
        }
    }

    return (
        <div className="sign-page">
            <h1>Bem-vindo(a)</h1>
            <h2>Crie sua conta!</h2>
            <FormSign email={email} password={password} name={name} setUserEmail={setUserEmail} setUserPassword={setUserPassword} setUserName={setUserName} setUserType={setUserType} signUpHandle={signUpHandle} />
            <div>
                <h3 className="error-message">{errorMessage}</h3>
            </div>
            <div>
                <Link to="/banco-de-ideias-cetificadora-3/LoginPage" className="login-account">Já tenho uma conta</Link>
            </div>
        </div>
    )
}

//formulario de cadastro
function FormSign({ setUserEmail, setUserPassword, setUserName, setUserType, signUpHandle, email, password, name }) {
    return (
        <form className="sign-form">
            <InputField value={email} className="input-field" label="Email" type="email" onChange={setUserEmail} />
            <InputField value={password}className="input-field" label="Senha" type="password" onChange={setUserPassword} />
            <InputField value={name}className="input-field" label="Nome" type="text" onChange={setUserName} />
            <InputField className="radio-field" name="radioButton" label="Sou discente/docente da UTFPR" type="radio" value="internal" onChange={setUserType} />
            <InputField className="radio-field" name="radioButton" label="Sou integrante do projeto de extensão" type="radio" value="member" onChange={setUserType} />
            <InputField className="radio-field" name="radioButton" label="Sou membro externo afetada pelo projeto" type="radio" value="external" onChange={setUserType} />
            <Button className="default-button" onClick={signUpHandle} text="Cadastrar" />
        </form>
    )
}


export default SignPage