import { type JSX } from "react";
import Navegacao from "../../../componentes/Navegacao/Navegacao";
import AtualizarProduto from "../../../componentes/Atualizar/AtualizarProduto";
import Rodape from "../../../componentes/Rodape/Rodape";

function PAtualizarProduto(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <AtualizarProduto />

            <Rodape />
        </div>
    );
}

export default PAtualizarProduto;
