import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import PListaProdutos from './pages/PListagemProduto/PListagemProduto'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} />
        <Route path='/login' element={<PLogin />} />
        <Route path='/lista/produtos' element={<PListaProdutos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App