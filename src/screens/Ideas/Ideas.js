import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { auth } from "../../config/Fb"
import { logOut } from "../../utils/FirebaseFunctions"

const IdeasPage = (props) => {
    let navigate = useNavigate();
    const user = auth.currentUser;

    const changeScreen = (path) => {
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
        </div>
    )
}

export default IdeasPage