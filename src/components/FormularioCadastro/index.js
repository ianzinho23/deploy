import { useState, useEffect } from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";
import useMensagem from '../../hooks/useMensagem';
import MensagemFeedback from '../MensagemFeedback';
import logo from '../../assets/images/logo.png';
import axios from 'axios';

function FormularioCadastro() {
    const [nomePrato, setNomePrato] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState('');
    const [disponibilidade, setDisponibilidade] = useState('');
    const [urlImagem, setUrlImagem] = useState('');

    const navigate = useNavigate();
    const { exibirMensagem, mensagem, tipoMensagem, visivel, fecharMensagem } = useMensagem();

    const salvarOffline = (prato) => {
        const pendentes = JSON.parse(localStorage.getItem('pratosPendentes')) || [];
        pendentes.push(prato);
        localStorage.setItem('pratosPendentes', JSON.stringify(pendentes));
    };

    const sincronizarPendentes = async () => {
        const pendentes = JSON.parse(localStorage.getItem('pratosPendentes')) || [];
        if (pendentes.length === 0) return;

        let todosEnviados = true;

        for (const prato of pendentes) {
            try {
                await axios.post('http://localhost:8080/pratos', prato);
            } catch (error) {
                todosEnviados = false;
                console.error("Erro ao sincronizar prato offline:", prato, error);
                break;
            }
        }

        if (todosEnviados) {
            localStorage.removeItem('pratosPendentes');
            exibirMensagem('Dados offline sincronizados com sucesso!', 'sucesso');
        }
    };

    useEffect(() => {
        sincronizarPendentes();
    }, []);

    const cadastrarPrato = async () => {
        const novoPrato = {
            nomePrato,
            descricao,
            preco,
            categoria,
            disponibilidade,
            urlImagem
        };

        try {
            const response = await axios.post('http://localhost:8080/pratos', novoPrato);
            exibirMensagem(response.data.mensagem || 'Prato cadastrado com sucesso!', 'sucesso');
        } catch (error) {
            salvarOffline(novoPrato);
            exibirMensagem('Sem conexão. O prato foi salvo localmente e será enviado automaticamente.', 'aviso');
        }

        setNomePrato('');
        setDescricao('');
        setPreco('');
        setCategoria('');
        setDisponibilidade('');
        setUrlImagem('');
    };

    return (
        <div className="container">
            <button onClick={() => navigate('/')} className="botao-voltar">Voltar</button>
            <br />
            <img src={logo} alt="Logo da empresa" />
            <h2>Cadastro de Prato</h2>
            <form onSubmit={(e) => { e.preventDefault(); cadastrarPrato(); }}>
                <input 
                    type="text"
                    placeholder="Nome do Prato"
                    value={nomePrato}
                    onChange={(e) => setNomePrato(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                />
                <input 
                    type="number"
                    step="0.01"
                    placeholder="Preço"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    placeholder="Categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    placeholder="Disponibilidade"
                    value={disponibilidade}
                    onChange={(e) => setDisponibilidade(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    placeholder="URL da Imagem"
                    value={urlImagem}
                    onChange={(e) => setUrlImagem(e.target.value)}
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>

            <MensagemFeedback
                mensagem={mensagem}
                tipo={tipoMensagem}
                visivel={visivel}
                onclose={fecharMensagem}
            />
        </div>
    );
}

export default FormularioCadastro;
