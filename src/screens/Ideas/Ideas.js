import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import {auth} from "../../config/Fb"

const IdeasPage = (props) =>{
    let navigate = useNavigate();
    const user = auth.currentUser;

    const ChangeScreen = (path) =>{
        navigate(path);
    }

    if(!user){
        return(
            <div>
                {window.onload = ()=>{ChangeScreen("/banco-de-ideias-cetificadora-3/")}}
            </div>
        )
    }

    return(
        <div>
            <h1>
                Ideias
            </h1>
            <Button text={"Ir para Perfil"} onClick={()=>{ChangeScreen(`/banco-de-ideias-cetificadora-3/ProfilePage`)}}/>
        </div>
    )
}

export default IdeasPage