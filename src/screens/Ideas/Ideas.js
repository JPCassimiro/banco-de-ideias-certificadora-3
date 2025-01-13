import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { auth } from "../../config/Fb"
import { getAllIdeiasList, logOut } from "../../utils/FirebaseFunctions"
import { useEffect, useState } from "react"
import ModalIdea from "../../components/NewIdeaModal"
import ModalModifyIdea from "../../components/ModifyIdeaModal"
import { onAuthStateChanged } from "firebase/auth"
import PlaceholderList from "../../components/PlaceholderList"

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

    const changeScreen = (path,state = null) => {
        navigate(path, state={state});
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
        if((ideas.length !== 0) || (ideas !== null) || (ideas !== undefined)){
            setIdeasList(ideas.map(idea =>
                <li key={idea.id}>                    
                    <h6>id: {idea.id}</h6>
                    <p>titulo: {idea.title}</p>
                    <p>de: {idea.user}</p>
                    <Button className="default-button" text={"Ir para Visualizar Ideia"} onClick={() => { 
                        const state = {user: idea.user,idea: idea.id}
                        changeScreen("/banco-de-ideias-certificadora-3/IdeaView",state)
                        }} />
                    <Button className="default-button" text={"Ir para Visualização Detalhada da Ideia"} onClick={() => {
                        const state = {user: idea.user, idea: idea.id}
                        changeScreen("/banco-de-ideias-certificadora-3/DetailedIdeaView",state) 
                        }} />
                </li>
            ));
        }
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
                    <ModalModifyIdea />
                    <PlaceholderList ideasList={ideasList} />
                </div>
            )}
        </div>
    )
}

export default IdeasPage