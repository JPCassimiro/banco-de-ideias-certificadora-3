import { useNavigate } from "react-router-dom";
import Button from "../../components/Button"
import { useEffect, useState } from "react";
import { auth, db } from "../../config/Fb";
import { collection, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth"
import { getUserIdeas } from "../../utils/FirebaseFunctions"
import ListComponent from "../../components/ListComponent"

const ProfilePage = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userControl, setUserControl] = useState(null);
    const [ideasList, setIdeasList] = useState(null);

    const changeScreen = (path,state = null) => {
        navigate(path, state={state});
    }

    useEffect((changeScreen) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserControl(user);
                getCurrentUserData();
                updateList();
            } else {
                setUserControl(null);
                changeScreen("/banco-de-ideias-certificadora-3/LoginPage");
            }
        })
    }, [])

    const getCurrentUserData = async () =>{
        const docRef = doc(collection(db, "userCollectionList"), auth.currentUser.email);
        const docSnap = await getDoc(docRef)
        const userData = docSnap.data();
        setUser(userData);
    }

    const updateList = async () => {
        const ideas = await getUserIdeas(auth.currentUser.email);
        if((ideas.length !== 0) || (ideas !== null) || (ideas !== undefined)){
            setIdeasList(ideas.map(idea =>
                <li key={idea.id}>
                    <p>{idea.title}</p>
                    <p>{idea.date}</p>
                    <Button className="default-button" text={"Ir para Visualizar Ideia"} onClick={() => {
                        const state = {user: idea.user,idea: idea.id}
                        changeScreen("/banco-de-ideias-certificadora-3/IdeaView",state)
                    }} />
                    <Button className="default-button" text={"Remover"} onClick={() => {}} />
                    <Button className="default-button" text={"Editar"} onClick={() => {}} />
                </li>
            ));
        }
    }

    return (
        <div>
            {userControl && user ?( 
                <div>
                <h1>
                    Perfil de usuario
                </h1>
                <h3>{user.Name} você é um {user.Type}</h3>
                {user.SuperType ? <h3>Você também é um {user.SuperType}</h3> : <div></div>}
                <Button className="default-button" text={"Ir para Ideias"} onClick={() => { changeScreen("/banco-de-ideias-certificadora-3/IdeasPage") }} />
                {/* <ListComponent ideasList={ideasList} /> */}
            </div>
            ):(<div></div>)}
        </div>
    )
}

export default ProfilePage