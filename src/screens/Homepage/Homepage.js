import { Link } from "react-router-dom"
import "../Homepage/Homepage.css"

const Homepage = () =>{
    return(
        <div className="home-page">
            <div className="center-square">
                <h3>
                    Bem-vindo(a)!
                </h3>
                <p>
                    Este é o banco de ideias do projeto de extensão meninas digitais da UTFPR de Cornélio Procópio. 
                </p>
                <p>
                    Para mais informações acesse o <a href="https://github.com/JPCassimiro/banco-de-ideias-certificadora-3" className="link-text">repositório no github.</a> 
                </p>
                <p>
                    Projeto em progresso.
                </p>
                <Link to="/banco-de-ideias-certificadora-3/SignPage" className="link-text">Criar conta</Link>
                <Link to="/banco-de-ideias-certificadora-3/LoginPage" className="link-text">Já tenho uma conta</Link>
            </div>
        </div>
    )
}

export default Homepage