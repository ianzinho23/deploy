import { useState } from "react";
import './styles.css'
import { useNavigate } from "react-router-dom";
import useMensagem from '../../hooks/useMensagem'
import MensagemFeedback from '../MensagemFeedback'
import logo from '../../assets/images/logo.png'
import axios from 'axios'

function FormularioCadastro() {
    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState('')
    const [categoria, setCategoria] = useState('')
    const [disponibilidade, setDisponibilidade] = useState('')
    const [urlImagem, setUrlImagem] = useState('')

    const navigate = useNavigate()
    const { exibirMensagem , mensagem, tipoMensagem, visivel, fecharMensagem } = useMensagem()

    const cadastrarPrato = async () => {
        try {
            const response = await axios.post('http://localhost:8080/pratos', {
                nomePrato,
                descricao,
                preco,
                categoria,
                disponibilidade,
                urlImagem
            })
            exibirMensagem(response.data.mensagem || 'Prato cadastrado com sucesso!', 'sucesso')
            setNomePrato('')
            setDescricao('')
            setPreco('')
            setCategoria('')
            setDisponibilidade('')
            setUrlImagem('')
        } catch (error) {
            let erroMsg = 'Erro ao conectar ao servidor.'
            if (error.response && error.response.data) {
                erroMsg = error.response.data.mensagem
                if (error.response.data.erros) {
                    erroMsg += ' ' + Object.values(error.response.data.erros).join(', ')
                }
            }
            exibirMensagem(erroMsg, 'erro')
        }
    }

    return (
        <div className="container">
            <button onClick={() => navigate('/')} className="botao-voltar">
                Voltar
            </button>
            <br/>
            <img src={logo} alt="Logo da empresa" />
            <h2>Cadastro de Prato</h2>
            <form onSubmit={(e) => { e.preventDefault(); cadastrarPrato() }}>
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
    )
}

export default FormularioCadastro
