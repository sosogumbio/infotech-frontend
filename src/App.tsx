
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";


import PHome from "./pages/PHome/PHome";
import PLogin from "./pages/PLogin/PLogin";


import PListagemProduto from "./pages/PListagemProduto/PListagemProduto";
import PDetalhesProduto from "./pages/PDetalhesProduto/PDetalhesProduto";



import PListagemCategoria from "./pages/PListagemCategorias/PListagemCategorias";
import PDetalhesCategoria from "./pages/PDetalhesCategoria/PDetalhesCategoria";
import PAtualizarCategoria from "./pages/PAtualizar/PAtualizarCategoria/PAtualizarCategoria";
import PListagemMovimentacao from "./pages/PListagemMovimentacoes/PListagemMovimentacoes";
import PDetalhesMovimentacao from "./pages/PDetalhesMovimentacao/PDetalhesMovimentacao";
import PAtualizarMovimentacao from "./pages/PAtualizar/PAtualizarMovimentacao/PAtualizarMovimentacao";

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
                    path="/detalhes/produto/:id"
                    element={<PDetalhesProduto />}
                />

               

                <Route
                    path="/lista/categorias"
                    element={<PListagemCategoria />}
                />

                <Route
                    path="/detalhes/categoria/:id"
                    element={<PDetalhesCategoria />}
                />

                <Route
                    path="/atualizar/categoria/:id"
                    element={<PAtualizarCategoria />}
                />

             
                <Route
                    path="/lista/movimentacoes"
                    element={<PListagemMovimentacao />}
                />

                <Route
                    path="/detalhes/movimentacao/:id"
                    element={<PDetalhesMovimentacao />}
                />

                <Route
                    path="/atualizar/movimentacao/:id"
                    element={<PAtualizarMovimentacao />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
