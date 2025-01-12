import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { auth } from "../../config/Fb"
import { getAllIdeiasList, logOut } from "../../utils/FirebaseFunctions"
import { useEffect, useState } from "react"
import ModalIdea from "../../components/NewIdeaModal"
import ModalModifyIdea from "../../components/ModifyIdeaModal"
import { onAuthStateChanged } from "firebase/auth"

const IdeasPage = (props) => {
    const [user, setUser] = useState(null);
    const [ideasList, setIdeasList] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                updateList();
            } else {
                changeScreen("/banco-de-ideias-certificadora-3/LoginPage");
            }
        })
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

    const updateList = async () => {
        const ideas = await getAllIdeiasList();
        setIdeasList(ideas.map(idea =>
            <li key={idea.id}>
                <h6>{idea.title}</h6>
                <p>{idea.description}</p>
                <p>{idea.date}</p>
            </li>
        ));
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
            {user && (
                <div>
                    <ModalIdea email={user.email} />
                    <PlaceholderList ideasList={ideasList} />
                </div>
            )}
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

function PlaceholderList({ ideasList }) {
    if (ideasList !== null) {
        return <ul>{ideasList}</ul>;
    } else {
        return (<div></div>);
    }
}

export default IdeasPage