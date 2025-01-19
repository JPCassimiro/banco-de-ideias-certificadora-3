import { Link } from "react-router-dom";
import "../Homepage/Homepage.css"

const Homepage = () => {
  return (
    <div className="home-page">
      
      <header className="header">
        <h1 className="header-title">Banco de Ideias</h1>
    
      </header>

 
      <div className="center-square">
        <h3 className="welcome-title">Bem-vindo(a)!</h3>
        <p className="description">
          Este é o banco de ideias do projeto de extensão meninas digitais da UTFPR de Cornélio Procópio.
        </p>
        <p className="description1">
          Para mais informações, acesse o {" "}
          <a
            rel="noreferrer"
            href="https://github.com/JPCassimiro/banco-de-ideias-certificadora-3"
            target="_blank"
            className="link-text_2"
          >
            repositório no GitHub.
          </a>
        </p>
        <div className="button-container">
          <Link to="/banco-de-ideias-certificadora-3/SignPage" className="button_1">
            Criar conta
          </Link>
          <Link to="/banco-de-ideias-certificadora-3/LoginPage" className="button_2">
            Já tenho uma conta
          </Link>
        </div>
        
      </div>

   
      <footer className="footer">
        <p className="footer-text">Banco de Ideias - Meninas Digitais</p>
      </footer>
    </div>
  );
};

export default Homepage;
