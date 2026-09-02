import { Navigate } from 'react-router-dom';
import { type ComponentType } from 'react';

interface RotaPrivadaProps {
    componente: ComponentType;
    [chave: string]: unknown;
}

/**
 * Componente responsável por proteger rotas privadas da aplicação.
 *
 * Antes de renderizar o componente solicitado, verifica se existe uma sessão
 * autenticada no navegador. Se não houver, o usuário é redirecionado
 * automaticamente para a tela de login, impedindo o acesso indevido.
 *
 * @param componente - componente a ser renderizado caso o acesso seja permitido
 * @param outrasProps - propriedades adicionais repassadas ao componente
 * @returns o componente protegido, ou um redirecionamento para /login
 */
const RotaPrivada = ({ componente: Componente, ...outrasProps }: RotaPrivadaProps) => {
    const usuarioLogado = Boolean(localStorage.getItem('isAuth'));

    if (!usuarioLogado) {
        return <Navigate to="/login" />;
    }

    return <Componente {...outrasProps} />;
};

export default RotaPrivada;