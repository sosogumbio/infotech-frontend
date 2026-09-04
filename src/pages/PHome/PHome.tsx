import type { JSX } from "react";
import BoasVindas from "../../componentes/BoasVindas/BoasVindas";
import Navegacao from "../../componentes/Navegacao/Navegacao";
import Rodape from "../../componentes/Rodape/Rodape";

function PHome(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <BoasVindas />
            <Rodape />
        </div>
    );
}

export default PHome;
