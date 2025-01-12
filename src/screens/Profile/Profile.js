import { useNavigate } from "react-router-dom";
import Button from "../../components/Button"
import { useEffect, useState } from "react";
import { auth, db } from "../../config/Fb";
import { collection, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth"

const ProfilePage = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userControl, setUserControl] = useState(null);

    const changeScreen = (path) => {
        navigate(path);
    }

    useEffect((changeScreen) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserControl(user);
                async function getCurrentUserData() {
                    const docRef = doc(collection(db, "userCollectionList"), auth.currentUser.email);
                    const docSnap = await getDoc(docRef)
                    const userData = docSnap.data();
                    setUser(userData)
                }
                getCurrentUserData();
            } else {
                setUserControl(null);
                changeScreen("/banco-de-ideias-certificadora-3/LoginPage");
            }
        })
    }, [])

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
            </div>
            ):(<div></div>)}
        </div>
    )
}

export default ProfilePage