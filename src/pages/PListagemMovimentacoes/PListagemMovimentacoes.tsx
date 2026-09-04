import { type JSX } from "react";
import Navegacao from "../../componentes/Navegacao/Navegacao";
import ListagemMovimentacoes from "../../componentes/Listagens/ListagemMovimentacao";
import Rodape from "../../componentes/Rodape/Rodape";

function PListagemMovimentacao(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <ListagemMovimentacoes />

            <Rodape />
        </div>
    );
}

export default PListagemMovimentacao;