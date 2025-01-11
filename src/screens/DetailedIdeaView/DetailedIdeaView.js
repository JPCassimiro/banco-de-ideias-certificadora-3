import { useState } from "react";
import "../DetailedIdeaView/DetailedIdeaView.css"

const DetailedIdeaView = () => {
    const [ideaTitle, setIdeaTitle] = useState("Teste Titulo");
    const [description, setDescription] = useState("Teste Descrição Teste Descrição Teste Descrição Teste Descrição Teste Descrição");
    const [agreeCount, setAgreeCount] = useState("5");
    const [disagreeCount, setDisagreeCount] = useState("2");

    return (
        <main className="body">
            <div className="ideaContainer">
                <h3 className="header">Visualização Detalhada da Sugestão</h3>
                <h3 className="title"><strong>Título: </strong>{ideaTitle}</h3>
                <div className="description">
                    <strong>Descrição: </strong>
                    <p>{description}</p>
                </div>
                <div className="votesCount">
                    <span><strong>Concordam: </strong>{agreeCount}</span>
                    <span><strong>Discordam: </strong>{disagreeCount}</span>
                </div>
            </div>
        </main>
    )
}

export default DetailedIdeaView;