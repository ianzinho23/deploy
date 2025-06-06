// src\pages\Home\index.js

import { useNavigate } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/images/logo.png'

function PaginaHome() {
    const navigate = useNavigate();

    return (
        <div className="pagina-home">
            <div className="container">
              <img src={logo} alt="Logo da empresa" />

                <h1>Bem-Vindo ao Sabor & Charme</h1>
                <p>Escolha uma opção abaixo:</p>
                <div className="botoes-home">
                    <button onClick={() => navigate('/cadastro')} className="botao-home">
                        Adicionar ao Cardápio
                    </button>
                    <button onClick={() => navigate('/usuarios')} className="botao-home">
                        Ver o Cardápio
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaginaHome;
