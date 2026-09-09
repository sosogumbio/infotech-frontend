import { type JSX } from "react";
import Navegacao from "../../componentes/Navegacao/Navegacao";
import ListagemProdutos from "../../componentes/Listagens/ListagemProduto";
import Rodape from "../../componentes/Rodape/Rodape";
function PListagemProduto(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <ListagemProdutos />

            <Rodape />
        </div>
    );
}

export default PListagemProduto;