import { useState, useEffect } from "react";
import axios from "axios";
import './styles.css'

function ListaDePratos() {
    const [pratos, setPratos] = useState([])

    useEffect(() => {
        const carregarPratos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/pratos')
                setPratos(response.data)
            } catch (error) {
                alert('Erro ao buscar pratos: ' + (error?.message || 'Erro desconhecido'))
                setPratos([])
            }
        }
        carregarPratos()
    }, [])

    const excluirPrato = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este prato?')) {
            try {
                await axios.delete(`http://localhost:8080/pratos/${id}`)
                setPratos(pratos.filter(p => p.id !== id)) // remove da lista
                alert('Prato excluído com sucesso.')
            } catch (error) {
                alert('Erro ao excluir prato: ' + (error?.message || 'Erro desconhecido'))
            }
        }
    }

    return (
        <ul id="listaPratos" className="lista-pratos">
            {pratos.length === 0 ? (
                <li>Nenhum prato encontrado.</li>
            ) : (
                pratos.map(prato => (
                    <li key={prato.id}>
                        <strong>Nome do Prato: </strong> {prato.nomePrato}<br />
                        <strong>Descrição: </strong> {prato.descricao}<br />
                        <strong>Preço: </strong> R$ {parseFloat(prato.preco).toFixed(2)}<br />
                        <strong>Categoria: </strong> {prato.categoria}<br />
                        <strong>Disponibilidade: </strong> {prato.disponibilidade}<br />
                        <img src={prato.urlImagem} alt={prato.nomePrato} width="200" /><br />
                        <button type="button" onClick={() => excluirPrato(prato.id)}>Excluir</button>
                    </li>
                ))
            )}
        </ul>
    )
}

export default ListaDePratos
