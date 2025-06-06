import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaHome from './pages/Home'; // ✅ Importando a nova página Home
import PaginaCadastro from './pages/Cadastro';
import PaginaListaUsuarios from './pages/Lista';
import './App.css'; // Para estilos globais, se necessário

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaHome />} /> {/* Página inicial */}
        <Route path="/cadastro" element={<PaginaCadastro />} /> {/* Página de cadastro */}
        <Route path="/usuarios" element={<PaginaListaUsuarios />} /> {/* Lista de usuários */}
      </Routes>
    </Router>
  );
}

export default App;
