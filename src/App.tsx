import { useState } from 'react'
import './App.css'
import PListagemProdutos from './pages/PListagemProdutos/PListagemProdutos'
import PCadastroProduto from './pages/PCadastroProduto/PCadastroProduto'

export default function App() {
  const [view, setView] = useState<'list' | 'create'>('list')

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="logo">Infotech</div>
        <nav className="nav">
          <button
            className={`btn ${view === 'list' ? 'btn-primary' : ''}`}
            onClick={() => setView('list')}
          >
            Listar Produtos
          </button>
          <button
            className={`btn ${view === 'create' ? 'btn-primary' : ''}`}
            onClick={() => setView('create')}
          >
            Cadastrar Produto
          </button>
        </nav>
      </header>

      <main className="app-main">
        {view === 'list' ? <PListagemProdutos /> : <PCadastroProduto />}
      </main>
    </div>
  )
}
