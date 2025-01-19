import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Button from './Button'
import InputField from './InputField'
import { addDataToUserCollection } from '../utils/FirebaseFunctions';
import { updateIdea } from '../utils/FirebaseFunctions';
import "./Styles/NewIdea.css"

const ModalIdea = (props) => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [charCountTitle, setCharCountTitle] = useState(0);
    const [charCountDescription, setCharCountDescription] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const maxLengthTitle = 45;
    const maxLengthDescription = 700;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setIdeaTitle = (e) => {
        setTitle(e.target.value);
        setCharCountTitle(e.target.value.length);
    }

    const setIdeaDescription = (e) => {
        setDescription(e.target.value);
        setCharCountDescription(e.target.value.length);
    }

    useEffect(()=>{
        if(props.update === true){
            getIdeaForUpdate();
        }
    },[])

    const handleSend = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (title !== '' && description !== '') {
            const data = {
                Title: title,
                Description: description,
                Agree: [],
                Disagree: [],
                Date: new Date()
            }
            if(props.update === true){
                const controlVariable = await updateIdea(props.email, props.ideaId,{
                    Title: title,
                    Description: description
                });
            }else{
                await addDataToUserCollection(props.email, data);
            }
            setTitle('');
            setDescription('');
            handleClose();
            window.location.reload();
        } else {
            setErrorMessage("Preencha todos os campos");
        }
    }

    const getIdeaForUpdate = async () =>{
        setTitle(props.currentTitle);
        setDescription(props.currentDescription);
        setCharCountTitle(title.length);
        setCharCountDescription(description.length);
    }

    return (
        <>
            <div>
                <Button className="default-button" text={props.text} onClick={handleShow} />
            </div>
            <div>
                <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        {props.update ? (<Modal.Title>Editar Sugestão</Modal.Title>) : (<Modal.Title>Nova sugestão</Modal.Title>)}
                    </Modal.Header>
                    <Modal.Body>
                        <IdeaForm charCountDescription={charCountDescription} maxLengthDescription={maxLengthDescription} errorMessage={errorMessage} charCountTitle={charCountTitle} maxLengthTitle={maxLengthTitle} title={title} description={description} setIdeaTitle={setIdeaTitle} setIdeaDescription={setIdeaDescription} handleSend={handleSend} />
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

function IdeaForm({ title, description, setIdeaTitle, setIdeaDescription, handleSend, charCountTitle, maxLengthTitle, maxLengthDescription, charCountDescription, errorMessage }) {
    return (
        <div>
            <form className="idea-form">
                <label htmlFor="ideaTitle">Título {charCountTitle}/{maxLengthTitle} </label>
                <InputField id="ideaTitle" maxLength={45} value={title} className="input-field" type="text" onChange={setIdeaTitle} />
                <label htmlFor="ideaDescription">Descrição {charCountDescription}/{maxLengthDescription}</label>
                <textarea id="ideaDescription" rows={7} cols={60} value={description} maxLength={700} className="textArea" onChange={setIdeaDescription} />
                <h3 style={{color:'white',alignSelf:'center',marginTop:"10px"}}>{errorMessage}</h3>
                <Button className="default-button" text="Enviar" onClick={handleSend} />
            </form>
        </div>
    );
}

export default ModalIdea;