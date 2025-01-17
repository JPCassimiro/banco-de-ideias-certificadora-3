import { useNavigate } from "react-router-dom"
import { auth } from "../../config/Fb"
import { getAllIdeiasList, logOut } from "../../utils/FirebaseFunctions"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import ListComponent from "../../components/ListComponent"
import { doc, collection, getDoc } from "firebase/firestore"
import { db } from "../../config/Fb"

const IdeasPage = (props) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [ideasList, setIdeasList] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getCurrentUserData();
                updateList();
            } else {
                changeScreen("/banco-de-ideias-certificadora-3/LoginPage");
            }
        })
    }, [])

    const getCurrentUserData = async () =>{
        const docRef = doc(collection(db, "userCollectionList"), auth.currentUser.email);
        const docSnap = await getDoc(docRef)
        const userDataConst = docSnap.data();
        setUserData(userDataConst);
    }

    const changeScreen = (path,state = null) => {
        navigate(path, state={state});
    }

    const logOutHandle = async () => {
        let controlVariable = await logOut();
        if (controlVariable) {
            changeScreen("/banco-de-ideias-certificadora-3/LoginPage");
        }
    }

    const updateList = async () => {
        const ideas = await getAllIdeiasList();
        if((ideas.length !== 0) || (ideas !== null) || (ideas !== undefined)){
            // setIdeasList(ideas.map(idea =>
            //     <li key={idea.id}>
            //         <p>{idea.title}</p>
            //         <p>{idea.user}</p>
            //         <p>{idea.date}</p>
            //         <Button className="default-button" text={"Ir para Visualizar Ideia"} onClick={() => {
            //             const state = {user: idea.user,idea: idea.id}
            //             changeScreen("/banco-de-ideias-certificadora-3/IdeaView",state)
            //         }} />
            //     </li>
            // ));
            setIdeasList(ideas);
        }
    }

    return (
        <div>
            {/* <h1>
                Ideias
            </h1>
            <div>
                <Button className="default-button" text={"Ir para Perfil"} onClick={() => { changeScreen("/banco-de-ideias-certificadora-3/ProfilePage") }} />
            </div>
            <div>
                <Button className="default-button" text={"Logout"} onClick={() => { logOutHandle() }} />
            </div> */}
            {user && (
                <div>
                    {ideasList ? <ListComponent logOutHandle={()=>{logOutHandle()}} email={user.email} ideas={ideasList} /> : <div><p>Carregando...</p></div>}
                </div>
            )}
        </div>
    )
}

export default IdeasPage