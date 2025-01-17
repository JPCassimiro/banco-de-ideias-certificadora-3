import "./Styles/ListComponent.css"
import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import ModalIdea from "./IdeaModal";

function ListComponent(props) {
    const [ideas, setIdeas] = useState(props.ideas);
    const [filterText, setFilterText] = useState("");
    let navigate = useNavigate();

    const changeScreen = (path,state = null) => {
        navigate(path, state={state});
    }

    const updateIdea = (id, updatedData) => {
        const updatedIdeas = ideas.map((idea) =>
            idea.id === id ? { ...idea, ...updatedData } : idea
        );
        // setIdeas(updatedIdeas);
    };


    const filteredIdeas = ideas.filter(
        (idea) =>
            idea.title.toLowerCase().includes(filterText.toLowerCase()) ||
            idea.description.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div>
            <header>
                <h1>Banco de ideas</h1>
                <nav>
                    <ModalIdea text={"Nova Ideia"} email={props.email} />
                </nav>
            </header>
            <main>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Filtrar:"
                        value={filterText}
                        onChange={(e) => {setFilterText(e.target.value)}}
                    />
                </div>
                <div className="ideias-container">
                    <ul className="list">
                        {filteredIdeas.map((idea) => (
                            <li onClick={() => {
                                const state = {user: idea.user,idea: idea.id}
                                changeScreen("/banco-de-ideias-certificadora-3/IdeaView",state)
                                }} key={idea.id}>
                                <p>{idea.title}</p>
                                <p>{idea.name}</p>
                                <p>{idea.date}</p>
                                <p>ThumbsUP {idea.agree.length}/{idea.disagree.length} ThumbsDown</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default ListComponent;

