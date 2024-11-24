import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { auth } from "../../config/Fb"

const IdeasPage = (props) => {
    let navigate = useNavigate();
    const user = auth.currentUser;

    const changeScreen = (path) => {
        navigate(path);
    }

    if (!user) {
        return (
            <div>
                {window.onload = () => { changeScreen("/banco-de-ideias-cetificadora-3/") }}
            </div>
        )
    }

    return (
        <div>
            <h1>
                Ideias
            </h1>
            <Button className="default-button" text={"Ir para Perfil"} onClick={() => { changeScreen(`/banco-de-ideias-cetificadora-3/ProfilePage`) }} />
        </div>
    )
}

export default IdeasPage