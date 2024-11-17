import React, { useState } from "react";
import { SingUpFunction } from "../utils/FirebaseFunctions";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Sign = () =>{
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [name, setName] = useState(''); 
    const [type, setType] = useState();

    // Função chamada ao alterar o campo de e-mail
    const setUserEmail = (e) => {
        setEmail(e.target.value);
    };

    // Função chamada ao alterar o campo de senha
    const setUserPassword = (e) => {
        setPassword(e.target.value);
    };

    const setUserName = (e) => {
        setName(e.target.value);
    };

    const setUserType = (e) => {
        setType(e.target.value);
    };

    const signUpHandle = (e) =>{
        e.preventDefault();
        SingUpFunction({email,password,name,type})
        setEmail('');
        setPassword('');
        setName('');
        setType();
    }

    return(
        <div className="sign-page">
            <FormSign setUserEmail={setUserEmail} setUserPassword={setUserPassword} setUserName={setUserName} setUserType={setUserType} signUpHandle={signUpHandle}/>
        </div>
    )
}

function FormSign({setUserEmail,setUserPassword,setUserName,setUserType,signUpHandle}){
    return(
        <form>
            <InputField className="input-field" label="Email" type="email" onChange={setUserEmail}/>
            <InputField className="input-field" label="Senha" type="password" onChange={setUserPassword}/>
            <InputField className="input-field" label="Nome" type="text" onChange={setUserName}/>
            <InputField className="input-field" name="radioButton" label="Sou estudante da utfpr" type="radio" onChange={setUserType}/>
            <InputField className="input-field" name="radioButton" label="Sou integrante do projeto de extensão" type="radio" onChange={setUserType}/>
            <InputField className="input-field" name="radioButton" label="Sou membro externo afetado pelo projeto" type="radio" onChange={setUserType}/>
            <Button onClick={signUpHandle} text="Cadastrar!"/>
        </form>
    )
}


export default Sign