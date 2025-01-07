import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from './Button'
import InputField from './InputField'
import { addDataToUserCollection } from '../utils/FirebaseFunctions';
import "./NewIdea.css"

const ModalIdea = (props) => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setIdeaTitle = (e) => {
        setTitle(e.target.value);
    }

    const setIdeaDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleSend = async (e) => {
        e.preventDefault();
        if (title !== '' || description !== '') {
            const data = {
                Title: title,
                Description: description,
                Agree: 0,
                Disagree: 0,
                Date: new Date()
            }
            await addDataToUserCollection(props.email, data)
            setTitle('');
            setDescription('');
            handleClose();
        } else {
            console.log("Preencha todos os campos");
        }
    }

    return (
        <>
            <div>
                <Button className="default-button" text="Abrir" onClick={handleShow} />
            </div>
            <div>
                <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Nova sugestão</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <IdeaForm title={title} description={description} setIdeaTitle={setIdeaTitle} setIdeaDescription={setIdeaDescription} handleSend={handleSend} />
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

function IdeaForm({ title, description, setIdeaTitle, setIdeaDescription, handleSend }) {
    return (
        <div>
            <form className="idea-form">
                <label htmlFor="ideaTitle">Título</label>
                <InputField id="ideaTitle" value={title} className="input-field" type="text" onChange={setIdeaTitle} />
                <label htmlFor="ideaDescription">Descrição</label>
                <textarea id="ideaDescription" rows={7} cols={60} value={description} className="textArea" onChange={setIdeaDescription} />
                <Button className="default-button" text="Enviar" onClick={handleSend} />
            </form>
        </div>
    );
}

export default ModalIdea;