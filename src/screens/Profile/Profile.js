import { useNavigate } from "react-router-dom";
import Button from "../../components/Button"
import { useEffect, useState } from "react";
import { auth, db } from "../../config/Fb";
import { collection, doc, getDoc } from 'firebase/firestore';


const ProfilePage = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState();
    let userData;

    const changeScreen = (path) => {
        navigate(path);
    }

    useEffect(() => {
        if(!auth.currentUser.email){
            changeScreen("/banco-de-ideias-certificadora-3/")
        }
        async function getCurrentUserData() {
            const docRef = doc(collection(db, "userCollectionList"), auth.currentUser.email);
            const docSnap = await getDoc(docRef)
            userData = docSnap.data();
            setUser(userData)
        }
        getCurrentUserData();
    }, [])

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
                Perfil de usuario
            </h1>
            <h3>{user.Name} você é um {user.Type}</h3>
            {user.SuperType ? <h3>Você também é um {user.SuperType}</h3> :<div></div> }
            <Button className="default-button" text={"Ir para Ideias"} onClick={() => { changeScreen("/banco-de-ideias-certificadora-3/IdeasPage") }} />
        </div>
    )
}

export default ProfilePage