import { useState } from 'react'
import './App.css'
import PListagemProdutos from './pages/PListagemProdutos/PListagemProdutos'
import PCadastroProduto from './pages/PCadastroProduto/PCadastroProduto'
import PListagemCategorias from './pages/PListagemCategorias/PListagemCategorias'
import PCadastroCategoria from './pages/PCadastroCategoria/PCadastroCategoria'
import PListagemMovimentacoes from './pages/PListagemMovimentacoes/PListagemMovimentacoes'
import PCadastroMovimentacao from './pages/PCadastroMovimentacao/PCadastroMovimentacao'

export default function App() {
  const [view, setView] = useState<'prod-list' | 'prod-create' | 'cat-list' | 'cat-create' | 'mov-list' | 'mov-create'>('prod-list')

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="logo">Infotech</div>
        <nav className="nav">
          <button className={`btn ${view === 'prod-list' ? 'btn-primary' : ''}`} onClick={() => setView('prod-list')}>Listar Produtos</button>
          <button className={`btn ${view === 'prod-create' ? 'btn-primary' : ''}`} onClick={() => setView('prod-create')}>Cadastrar Produto</button>

          <button className={`btn ${view === 'cat-list' ? 'btn-primary' : ''}`} onClick={() => setView('cat-list')}>Categorias</button>
          <button className={`btn ${view === 'cat-create' ? 'btn-primary' : ''}`} onClick={() => setView('cat-create')}>Cadastrar Categoria</button>

          <button className={`btn ${view === 'mov-list' ? 'btn-primary' : ''}`} onClick={() => setView('mov-list')}>Movimentações</button>
          <button className={`btn ${view === 'mov-create' ? 'btn-primary' : ''}`} onClick={() => setView('mov-create')}>Cadastrar Mov.</button>
        </nav>
      </header>

      <main className="app-main">
        {view === 'prod-list' && <PListagemProdutos />}
        {view === 'prod-create' && <PCadastroProduto />}
        {view === 'cat-list' && <PListagemCategorias />}
        {view === 'cat-create' && <PCadastroCategoria />}
        {view === 'mov-list' && <PListagemMovimentacoes />}
        {view === 'mov-create' && <PCadastroMovimentacao />}
      </main>
    </div>
  )
}
