import { type JSX } from "react";
import Navegacao from "../../componentes/Navegacao/Navegacao";
//import DetalhesMovimentacao from "../../componentes/Detalhes/DetalhesMovimentacao";
import Rodape from "../../componentes/Rodape/Rodape";


function PDetalhesMovimentacao(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <DetalhesMovimentacao />

            <Rodape />
        </div>
    );
}

export default PDetalhesMovimentacao;