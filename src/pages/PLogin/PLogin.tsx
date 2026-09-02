import { type JSX } from "react";
import Navegacao from "../../componentes/Navegacao/Navegacao";
import LoginForm from "../../componentes/FormLogin/FormLogin";
import Rodape from "../../componentes/Rodape/Rodape";


function PLogin(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
       
            <Navegacao />

         
            <LoginForm />

            <Rodape />
        </div>
    );
}

export default PLogin;