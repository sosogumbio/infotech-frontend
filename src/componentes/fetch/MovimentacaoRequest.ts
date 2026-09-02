import type { MovimentacaoDTO } from '../dto/MovimentacaoDTO';

const API_URL = import.meta.env.VITE_API_SERVER_URL;

class MovimentacaoRequests {

    private serverUrl;
    private endpointMovimentacao;

    constructor() {
        this.serverUrl = API_URL;
        this.endpointMovimentacao = '/api/movimentacoes';
    }

    async obterListaDeMovimentacoes() {

        try {

            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(
                `${this.serverUrl}${this.endpointMovimentacao}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': `${token}`
                    }
                }
            );

            if (respostaAPI.ok) {

                const listaDeMovimentacoes = await respostaAPI.json();

                return listaDeMovimentacoes;

            } else {

                throw new Error(
                    `Não foi possível listar as movimentações.`
                );

            }

        } catch (error) {

            console.error(
                `Erro ao fazer a consulta de movimentações. ${error}`
            );

            return;

        }
    }


    async obterMovimentacaoPorId(
        id_movimentacao: number
    ): Promise<MovimentacaoDTO | undefined> {

        try {

            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(
                `${this.serverUrl}${this.endpointMovimentacao}/${id_movimentacao}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': `${token}`
                    }
                }
            );

            if (respostaAPI.ok) {

                const movimentacao: MovimentacaoDTO =
                    await respostaAPI.json();

                return movimentacao;

            } else {

                throw new Error(
                    "Não foi possível buscar a movimentação."
                );

            }

        } catch (error) {

            console.error(
                `Erro ao fazer a consulta de movimentação por ID. ${error}`
            );

            return;

        }
    }


    async enviarFormularioMovimentacao(
        formMovimentacao: MovimentacaoDTO
    ): Promise<boolean> {

        try {

            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(
                `${this.serverUrl}${this.endpointMovimentacao}`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': `${token}`
                    },

                    body: JSON.stringify(formMovimentacao)
                }
            );

            if (!respostaAPI.ok) {
                throw new Error(
                    `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`
                );
            }

            console.info(
                `${respostaAPI.status}: ${respostaAPI.statusText}`
            );

            return true;

        } catch (error) {

            console.error(
                `Erro ao fazer consulta à API. ${error}`
            );

            return false;

        }
    }


    async atualizarMovimentacao(
        id_movimentacao: number,
        formMovimentacao: MovimentacaoDTO
    ): Promise<boolean> {

        try {

            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(
                `${this.serverUrl}${this.endpointMovimentacao}/${id_movimentacao}`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': `${token}`
                    },

                    body: JSON.stringify(formMovimentacao)
                }
            );

            if (!respostaAPI.ok) {
                throw new Error(
                    `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`
                );
            }

            console.info(
                `${respostaAPI.status}: ${respostaAPI.statusText}`
            );

            return true;

        } catch (error) {

            console.error(
                `Erro ao fazer consulta à API. ${error}`
            );

            return false;

        }
    }


    async removerMovimentacao(
        id_movimentacao: number
    ): Promise<boolean> {

        try {

            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(
                `${this.serverUrl}${this.endpointMovimentacao}/${id_movimentacao}`,
                {
                    method: 'DELETE',

                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': `${token}`
                    }
                }
            );

            if (!respostaAPI.ok) {

                const errorData = await respostaAPI
                    .json()
                    .catch(() => ({}));

                const errorMessage =
                    errorData.mensagem ||
                    `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;

                throw new Error(errorMessage);
            }

            console.info(
                `${respostaAPI.status} ${respostaAPI.statusText}`
            );

            return true;

        } catch (error) {

            console.error(
                `Erro ao fazer consulta à API. ${error}`
            );

            throw error;

        }
    }
}

export default new MovimentacaoRequests;