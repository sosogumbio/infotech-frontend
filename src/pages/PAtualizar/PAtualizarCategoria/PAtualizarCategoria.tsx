
import { type JSX } from "react";
import Navegacao from "../../../componentes/Navegacao/Navegacao";
import AtualizarCategoria from "../../../components/Atualizar/AtualizarCategoria";
import Rodape from "../../../components/Rodape/Rodape";

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
