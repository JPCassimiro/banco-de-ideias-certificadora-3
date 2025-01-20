import "./Styles/ListComponent.css"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalIdea from "./IdeaModal";

function ListComponent(props) {
    const [ideas, setIdeas] = useState(props.ideas.sort((a,b)=>{
        return new Date(b.date) - new Date(a.date)
    }));
    const [filterText, setFilterText] = useState("");
    let navigate = useNavigate();

    const changeScreen = (path,state = null) => {
        navigate(path, state={state});
    }

    const filteredIdeas = ideas.filter(
        (idea) =>
            idea.title.toLowerCase().includes(filterText.toLowerCase()) 
    );

    return (
        <div className="list-component-container">
            <header className="list-header">
                <h1 id="header-title">Banco de ideias <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-80q-26 0-47-12.5T400-126q-33 0-56.5-23.5T320-206v-142q-59-39-94.5-103T190-590q0-121 84.5-205.5T480-880q121 0 205.5 84.5T770-590q0 77-35.5 140T640-348v142q0 33-23.5 56.5T560-126q-12 21-33 33.5T480-80Zm-80-126h160v-36H400v36Zm0-76h160v-38H400v38Zm-8-118h58v-108l-88-88 42-42 76 76 76-76 42 42-88 88v108h58q54-26 88-76.5T690-590q0-88-61-149t-149-61q-88 0-149 61t-61 149q0 63 34 113.5t88 76.5Zm88-162Zm0-38Z"/></svg> </h1>
                <nav className="list-nav">
                    <ModalIdea text={"Nova Ideia"} email={props.email} />
                    <div className="container-icon" title="Ir para banco de ideias">
                        <svg onClick={()=>{changeScreen("/banco-de-ideias-certificadora-3/IdeasPage")}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M80-160v-160h160v160H80Zm240 0v-160h560v160H320ZM80-400v-160h160v160H80Zm240 0v-160h560v160H320ZM80-640v-160h160v160H80Zm240 0v-160h560v160H320Z"/></svg>
                    </div>
                    <div className="container-icon" title="Ir para perfil">
                        <svg onClick={()=>{changeScreen("/banco-de-ideias-certificadora-3/ProfilePage")}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M360-390q-21 0-35.5-14.5T310-440q0-21 14.5-35.5T360-490q21 0 35.5 14.5T410-440q0 21-14.5 35.5T360-390Zm240 0q-21 0-35.5-14.5T550-440q0-21 14.5-35.5T600-490q21 0 35.5 14.5T650-440q0 21-14.5 35.5T600-390ZM480-160q134 0 227-93t93-227q0-24-3-46.5T786-570q-21 5-42 7.5t-44 2.5q-91 0-172-39T390-708q-32 78-91.5 135.5T160-486v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-54-715q42 70 114 112.5T700-640q14 0 27-1.5t27-3.5q-42-70-114-112.5T480-800q-14 0-27 1.5t-27 3.5ZM177-581q51-29 89-75t57-103q-51 29-89 75t-57 103Zm249-214Zm-103 36Z"/></svg>
                    </div>
                    <div className="container-icon" title="Log Out">
                        <svg onClick={()=>{props.logOutHandle()}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                    </div>
                </nav>
            </header>
            <main>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Filtrar"
                        value={filterText}
                        onChange={(e) => {setFilterText(e.target.value)}}
                    />
                </div>
                <div className="ideas-list-container">
                    <ul className="ideas-list">
                        {filteredIdeas.map((idea) => (
                            <li title="Clique para ver a ideia" className="idea-li-item" onClick={() => {
                                const state = {user: idea.user, idea: idea.id, currentUserType: props.userSuperType}
                                changeScreen("/banco-de-ideias-certificadora-3/IdeaView",state)
                                }} key={idea.date}>
                                <div className="container-title-idea"><p>{idea.title}</p></div>
                                <div className="container-name-idea"><p>{idea.name}</p></div>
                                <div className="container-date-idea"><p>{idea.date.toLocaleString([], { day: "numeric", month: "numeric", year: "numeric" })}</p></div>
                                <div className="container-ratings-idea">
                                    <p>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0a6001"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                                            {idea.agree.length}/{idea.disagree.length} 
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7b0101"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default ListComponent;

