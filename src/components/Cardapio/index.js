import { useState, useEffect } from "react";
import axios from "axios";
import './styles.css';

function ListaDePratos() {
    const [pratos, setPratos] = useState([]);

    useEffect(() => {
        const carregarPratos = async () => {
            let pratosAPI = [];

            try {
                const response = await axios.get('http://localhost:8080/pratos');
                pratosAPI = response.data;
            } catch (error) {
                alert('Erro ao buscar pratos no Servidor. Exibindo apenas os salvos localmente.');
            }

            // Carregar pratos salvos offline
            const pratosOffline = JSON.parse(localStorage.getItem('pratosPendentes')) || [];

            // Combinar os dois
            const todosPratos = [...pratosAPI, ...pratosOffline];

            setPratos(todosPratos);
        };

        carregarPratos();
    }, []);

    const excluirPrato = async (id) => {
        if (!id) {
            alert("Este prato ainda não foi sincronizado e não pode ser excluído.");
            return;
        }

        if (window.confirm('Tem certeza que deseja excluir este prato?')) {
            try {
                await axios.delete(`http://localhost:8080/pratos/${id}`);
                setPratos(pratos.filter(p => p.id !== id));
                alert('Prato excluído com sucesso.');
            } catch (error) {
                alert('Erro ao excluir prato: ' + (error?.message || 'Erro desconhecido'));
            }
        }
    };

    return (
        <ul id="listaPratos" className="lista-pratos">
            {pratos.length === 0 ? (
                <li>Nenhum prato encontrado.</li>
            ) : (
                pratos.map((prato, index) => (
                    <li key={prato.id || `offline-${index}`}>
                        <strong>Nome do Prato: </strong> {prato.nomePrato}<br />
                        <strong>Descrição: </strong> {prato.descricao}<br />
                        <strong>Preço: </strong> R$ {parseFloat(prato.preco).toFixed(2)}<br />
                        <strong>Categoria: </strong> {prato.categoria}<br />
                        <strong>Disponibilidade: </strong> {prato.disponibilidade}<br />
                        <img src={prato.urlImagem} alt={prato.nomePrato} width="200" /><br />
                        <button 
                            type="button" 
                            onClick={() => excluirPrato(prato.id)}
                            disabled={!prato.id}
                        >
                            Excluir
                        </button>
                        {!prato.id && (
                            <span style={{ color: 'orange', fontWeight: 'bold' }}>
                                (Aguardando sincronização)
                            </span>
                        )}
                    </li>
                ))
            )}
        </ul>
    );
}

export default ListaDePratos;
