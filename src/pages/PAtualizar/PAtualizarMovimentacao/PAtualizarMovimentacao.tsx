import { type JSX } from "react";
import Navegacao from "../../../componentes/Navegacao/Navegacao";
import AtualizarMovimentacao from "../../../componentes/Atualizar/AtualizarMovimentacao";
import Rodape from "../../../componentes/Rodape/Rodape";

function PAtualizarMovimentacao(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <AtualizarMovimentacao />

            <Rodape />
        </div>
    );
}

export default PAtualizarMovimentacao;
