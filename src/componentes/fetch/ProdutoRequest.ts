import type {ProdutoDTO} from "../dto/ProdutoDTO";
const API_URL = import.meta.env.VITE_API_SERVER_URL;

class ProdutoRequests {
    private serverUrl;
    private endpointProduto;
    constructor() {
        this.serverUrl = API_URL;
        this.endpointProduto = '/api/produtos';
    }
    async obterListaDeProdutos() {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointProduto}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });
            if (respostaAPI.ok) {
                const listaDeProdutos = await respostaAPI.json();
                return listaDeProdutos;
            } else {
                throw new Error(`Não foi possível listar os produtos.`);
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de produtos. ${error}`);
            return;
        }
    }
    async obterProdutoPorId(id_produto: number): Promise<ProdutoDTO | undefined> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointProduto}/${id_produto}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });
            if (respostaAPI.ok) {
                const produto: ProdutoDTO = await respostaAPI.json();
                return produto;
            } else {
                throw new Error("Não foi possível buscar o produto.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de produto por ID. ${error}`);
            return;
        }
    }
    async enviarFormularioProduto(formProduto: ProdutoDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointProduto}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formProduto)
            });
            if(!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);
            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }
    async atualizarProduto(id_produto: number, formProduto: ProdutoDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointProduto}/${id_produto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formProduto)
            });
            if(!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);
            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }
    async removerProduto(id_produto: number): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointProduto}/${id_produto}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });
            if (!respostaAPI.ok) {
                const errorData = await respostaAPI.json().catch(() => ({}));
                const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                throw new Error(errorMessage);
            }
            console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);
            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            throw error;
        }
    }
}
export default new ProdutoRequests;