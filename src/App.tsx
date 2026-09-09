import "./App.css";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import PHome from "./pages/PHome/PHome";
import PLogin from "./pages/PLogin/PLogin";
import PListagemProduto from "./pages/PListagemProduto/PListagemProduto";
import PListagemCategoria from "./pages/PListagemCategorias/PListagemCategorias";
import PListagemMovimentacao from "./pages/PListagemMovimentacoes/PListagemMovimentacoes";
import PDetalhesCategoria from "./pages/PDetalhesCategoria/PDetalhesCategoria";
import PDetalhesMovimentacao from "./pages/PDetalhesMovimentacao/PDetalhesMovimentacao";
import PDetalhesProduto from "./pages/PDetalhesProduto/PDetalhesProduto";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<PHome />}
                />

                <Route
                    path="/login"
                    element={<PLogin />}
                />

     
                <Route
                    path="/lista/produtos"
                    element={<PListagemProduto />}
                />

          
                <Route
                    path="/lista/categorias"
                    element={<PListagemCategoria />}
                />

                <Route
                    path="/lista/movimentacoes"
                    element={<PListagemMovimentacao />}
                />
                
                 <Route
                    path="/detalhes/categoria/:id"
                    element={<PDetalhesCategoria />}
                />
                

                 <Route
                    path="/detalhes/movimentacao/:id"
                    element={<PDetalhesMovimentacao />}
                />
                
                 <Route
                    path="/detalhes/produto/:id"
                    element={<PDetalhesProduto />}
                />
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;