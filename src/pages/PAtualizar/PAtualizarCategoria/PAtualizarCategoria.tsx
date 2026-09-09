
import { type JSX } from "react";
import Navegacao from "../../../componentes/Navegacao/Navegacao";
import AtualizarCategoria from "../../../componentes/Atualizar/AtualizarCategoria";
import Rodape from "../../../componentes/Rodape/Rodape";

function PAtualizarCategoria(): JSX.Element {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Navegacao />

            <AtualizarCategoria />

            <Rodape />
        </div>
    );
}

export default PAtualizarCategoria;
