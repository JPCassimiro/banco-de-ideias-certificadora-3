import { useNavigate } from "react-router-dom";
import Button from "../../components/Button"
import { useEffect, useState } from "react";
import { auth, db } from "../../config/Fb";
import { collection, doc, getDoc } from 'firebase/firestore';


const ProfilePage = () => {
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [superType, setSuperType] = useState();
    const user = auth.currentUser;
    let userData;

    const changeScreen = (path) => {
        navigate(path);
    }

    useEffect(() => {
        async function getCurrentUserData() {
            const docRef = doc(collection(db, "userCollectionList"), user.email);
            const docSnap = await getDoc(docRef)
            userData = docSnap.data();
            setName(userData.Name);
            setType(userData.Type);
            if (userData.SuperType) {
                setSuperType(userData.superType)
            }
        }
        getCurrentUserData();
    }, [])

    if (!user) {
        return (
            <div>
                {window.onload = () => { changeScreen("/banco-de-ideias-cetificadora-3/") }}
            </div>
        )
    }

    return (
        <div>
            <h1>
                Perfil de usuario
            </h1>
            <h3>{name} você é um {type}</h3>
            <Button className="default-button" text={"Ir para Ideias"} onClick={() => { changeScreen(`/banco-de-ideias-cetificadora-3/IdeasPage`) }} />
        </div>
    )
}

export {
    ProfilePage
}