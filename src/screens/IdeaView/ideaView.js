import { useEffect, useState } from "react";
import Button from "../../components/Button";
import "../IdeaView/ideaView.css"
import { useLocation } from "react-router-dom";
import { getDetailedIdea } from "../../utils/FirebaseFunctions";
import { addIdeaReaction } from "../../utils/FirebaseFunctions";
import { useNavigate } from "react-router-dom";
import { deleteUserIdea } from "../../utils/FirebaseFunctions";
import ModalIdea from "../../components/IdeaModal";
import { auth } from "../../config/Fb";

const IdeaView = () => {
    const [ideaTitle, setIdeaTitle] = useState("Carregando...");
    const [description, setDescription] = useState("Carregando...");
    const [agreeCount, setAgreeCount] = useState();
    const [disagreeCount, setDisagreeCount] = useState();
    const [editControl, setEditControl] = useState(null);
    const [deleteControl, setDeleteControl] = useState(null);

    let navigate = useNavigate();

    const changeScreen = (path, state = null) => {
        navigate(path, state = { state });
    }
    const location = useLocation();//recupera o id da ideia

    useEffect(() => {
        getIdeaInfo();
        if (auth.currentUser.email === location.state.user) {
            setEditControl(true);
            setDeleteControl(true);
        }
        if (location.state.currentUserType) {
            setDeleteControl(true);
        }
    }, [])

    const getIdeaInfo = async () => {
        const ideaFields = await getDetailedIdea(location.state.user, location.state.idea);
        setIdeaTitle(ideaFields.title);
        setDescription(ideaFields.description);
        setAgreeCount(ideaFields.agree.length);
        setDisagreeCount(ideaFields.disagree.length);
    }

    const handleReaction = async (value) => {
        const controlVariable = await addIdeaReaction(location.state.user, location.state.idea, value, auth.currentUser.email);
        changeScreen("/banco-de-ideias-certificadora-3/IdeasPage");
    }

    const handledelete = async () => {
        await deleteUserIdea(location.state.user, location.state.idea);
        changeScreen("/banco-de-ideias-certificadora-3/IdeasPage");
    }

    return (
        <main className="body">
            <div className="ideaContainer">
                <h3 className="title"><strong>Título: </strong>{ideaTitle}</h3>
                <div className="description">
                    <p><strong>Descrição: </strong>{description}</p>
                </div>
                <p className="questionVote">Você concorda com esta ideia?</p>
                <div className="buttonsContainer">
                    <Button className="voteButton" text="Sim" onClick={() => { handleReaction(true) }} />
                    <Button className="voteButton" text="Não" onClick={() => { handleReaction(false) }} />
                </div>
                <div className="votesCount">
                    <span><strong>Concordam: </strong>{agreeCount}</span>
                    <span><strong>Discordam: </strong>{disagreeCount}</span>
                </div>
                <div className="DelEditBtns">
                    <div className="btn">
                        {deleteControl && (<Button className={"default-button"} onClick={() => { handledelete() }} text={"Excluir Ideia"} />)}
                    </div>
                    <div className="btn">
                        {editControl && (<ModalIdea text={"Modificar Ideia"} currentTitle={ideaTitle} currentDescription={description} ideaId={location.state.idea} email={location.state.user} update={true} />)}
                    </div>
                </div>

            </div>
        </main>
    )
}

export default IdeaView;