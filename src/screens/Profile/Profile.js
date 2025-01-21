import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../../config/Fb";
import { collection, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth"
import { getUserIdeas } from "../../utils/FirebaseFunctions"
import ListComponent from "../../components/ListComponent"
import { logOut } from "../../utils/FirebaseFunctions";
import "../Profile/Profile.css"

const ProfilePage = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userControl, setUserControl] = useState(null);
    const [ideasList, setIdeasList] = useState(null);

    const changeScreen = (path, state = null) => {
        navigate(path, state = { state });
    }

    const logOutHandle = async () => {
        let controlVariable = await logOut();
        if (controlVariable) {
            changeScreen("/banco-de-ideias-certificadora-3/LoginPage");
        }
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

    const getCurrentUserData = async () => {
        const docRef = doc(collection(db, "userCollectionList"), auth.currentUser.email);
        const docSnap = await getDoc(docRef)
        const userData = docSnap.data();
        setUser(userData);
    }

    const updateList = async () => {
        const ideas = await getUserIdeas(auth.currentUser.email);
        if ((ideas.length !== 0) || (ideas !== null) || (ideas !== undefined)) {
            setIdeasList(ideas);
        }
    }

    return (
        <div className="profile-container">
            {userControl && user ? (
                <div>
                    <div>
                        {ideasList ? <ListComponent userName={user.Name} userType={user.Type} logOutHandle={() => { logOutHandle() }} userSuperType={user.SuperType} email={auth.currentUser.email} ideas={ideasList} /> : <div>Carregando...</div>}
                    </div>
                </div>
            ) : (<div>Carregando...</div>)}
        </div>
    )
}

export default ProfilePage