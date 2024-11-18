import React, { useState } from "react";
import { SingUpFunction } from "../../utils/FirebaseFunctions";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";


const SignPage = () =>{
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [name, setName] = useState(''); 
    const [type, setType] = useState();
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

    const setUserName = (e) => {
        setName(e.target.value);
    };

    const setUserType = (e) => {
        console.log(e.target.value);
        setType(e.target.value);
    };

    const signUpHandle = async (e) =>{
        e.preventDefault();
        await SingUpFunction({email,password,name,type});
        setEmail('');
        setPassword('');
        setName('');
        setType();
        ChangeScreen("/banco-de-ideias-cetificadora-3/IdeasPage");
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
            <InputField className="input-field" name="radioButton" label="Sou estudante da UTFPR" type="radio" value="student" onChange={setUserType}/>
            <InputField className="input-field" name="radioButton" label="Sou integrante do projeto de extensão" type="radio" value="memeber" onChange={setUserType}/>
            <InputField className="input-field" name="radioButton" label="Sou membro externo afetada pelo projeto" type="radio" value="external" onChange={setUserType}/>
            <Button onClick={signUpHandle} text="Cadastrar!"/>
        </form>
    )
}


export default SignPage