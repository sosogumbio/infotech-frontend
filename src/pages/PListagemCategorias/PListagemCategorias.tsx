import { type JSX } from "react";
import Navegacao from "../../componentes/Navegacao/Navegacao";
import ListagemCategorias from "../../componentes/Listagens/ListagemCategorias";
import Rodape from "../../componentes/Rodape/Rodape";

function PListagemCategoria(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <ListagemCategorias />

            <Rodape />
        </div>
    );
}

export default PListagemCategoria;