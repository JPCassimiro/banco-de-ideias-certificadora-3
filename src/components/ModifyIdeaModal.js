import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from './Button'
import InputField from './InputField' 
import "./Styles/ModifyIdeaModal.css"

const ModalModifyIdea = (props) => {
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

    return (
        <>
            <div>
                <Button className="default-button" text="Abrir Modificar ideia" onClick={handleShow} />
            </div>
            <div>
                <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Alterar sugestão</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <IdeaForm title={title} description={description} setIdeaTitle={setIdeaTitle} setIdeaDescription={setIdeaDescription} />
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

function IdeaForm({ title, description, setIdeaTitle, setIdeaDescription}) {
    return (
        <div>
            <form className="idea-form">
                <label htmlFor="ideaTitle">Título</label>
                <InputField id="ideaTitle" value={title} className="input-field" type="text" onChange={setIdeaTitle} />
                <label htmlFor="ideaDescription">Descrição</label>
                <textarea id="ideaDescription" rows={7} cols={60} value={description} className="textArea" onChange={setIdeaDescription} />
                <Button className="default-button" text="Enviar" />
            </form>
        </div>
    );
}

export default ModalModifyIdea;