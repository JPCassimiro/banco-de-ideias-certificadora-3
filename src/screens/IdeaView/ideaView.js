import { useEffect, useState } from "react";
import Button from "../../components/Button";
import "../IdeaView/ideaView.css"
import { useLocation } from "react-router-dom";
import { getDetailedIdea } from "../../utils/FirebaseFunctions";

const IdeaView = () => {
    const [ideaTitle, setIdeaTitle] = useState("Teste Titulo");
    const [description, setDescription] = useState("Teste Descrição Teste Descrição Teste Descrição Teste Descrição Teste Descrição");
    const [agreeCount, setAgreeCount] = useState("5");
    const [disagreeCount, setDisagreeCount] = useState("2");

    const location = useLocation();//recupera o id da pesquisa 

    useEffect(()=>{
        getIdeaInfo();
    },[])

    const getIdeaInfo = async () =>{
        const ideaFields = await getDetailedIdea(location.state.user, location.state.idea);
        setIdeaTitle(ideaFields.title);
        setDescription(ideaFields.description);
        setAgreeCount(ideaFields.agree);
        setDisagreeCount(ideaFields.disagree);
    }

    return (
        <main className="body">
            <div className="ideaContainer">
                <h3 className="title"><strong>Título: </strong>{ideaTitle}</h3>
                <div className="description">
                    <strong>Descrição: </strong>
                    <p>{description}</p>
                </div>
                <p className="questionVote">Você concorda com esta ideia?</p>
                <div className="buttonsContainer">
                    <Button className="voteButton" text="Sim" />
                    <Button className="voteButton" text="Não" />
                </div>
                <div className="votesCount">
                    <span><strong>Concordam: </strong>{agreeCount}</span>
                    <span><strong>Discordam: </strong>{disagreeCount}</span>
                </div>
            </div>
        </main>
    )
}

export default IdeaView;