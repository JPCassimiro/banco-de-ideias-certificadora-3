import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { auth } from "../../config/Fb"
import { getAllIdeiasList, logOut } from "../../utils/FirebaseFunctions"
import { useEffect, useState } from "react"
import ModalIdea from "../../components/NewIdeaModal"
import ModalModifyIdea from "../../components/ModifyIdeaModal"

const IdeasPage = (props) => {
    const [user, setUser] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        setUser(auth.currentUser);
    }, [])

    const changeScreen = (path) => {
        console.log("Navigating to:", path);
        navigate(path);
    }

    const logOutHandle = async () => {
        let controlVariable = await logOut();
        console.log(controlVariable);
        if (controlVariable) {
            console.log("logOutHandle sucesso");
            changeScreen("/banco-de-ideias-certificadora-3/LoginPage");
        }
    }

    const check = () => {
        getAllIdeiasList();
    }

    if (!user) {
        return (
            <div>
                {window.onload = () => { changeScreen("/banco-de-ideias-certificadora-3/") }}
            </div>
        )
    }

    return (
        <div>
            <h1>
                Ideias
            </h1>
            <div>
                <Button className="default-button" text={"Ir para Perfil"} onClick={() => { changeScreen("/banco-de-ideias-certificadora-3/ProfilePage") }} />
            </div>
            <div>
                <Button className="default-button" text={"Logout"} onClick={() => { logOutHandle() }} />
            </div>
            <div>
                <ModalIdea email={user.email} />
            </div>
            <div>
                <ModalModifyIdea />
            </div>
            <div>
                <Button className="default-button" text={"Ir para Visualizar Ideia"} onClick={() => { changeScreen("/banco-de-ideias-certificadora-3/IdeaView") }} />
            </div>
            <div>
                <Button className="default-button" text={"Ir para Visualização Detalhada da Ideia"} onClick={() => { changeScreen("/banco-de-ideias-certificadora-3/DetailedIdeaView") }} />
            </div>
            <div>
                <Button className="default-button" text={"check"} onClick={() => { check() }} />
            </div>
        </div>
    )
}

export default IdeasPage