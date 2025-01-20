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
            setIdeasList(ideas);
        }
    }

    return (
        <div className="ideas-page-container">
            {user && (
                <div>
                    {ideasList ? <ListComponent logOutHandle={()=>{logOutHandle()}} userSuperType={userData.SuperType} email={user.email} ideas={ideasList} /> : <div><p>Carregando...</p></div>}
                </div>
            )}
        </div>
    )
}

export default IdeasPage