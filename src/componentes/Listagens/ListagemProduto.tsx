    import type ProdutoDTO  from '../../dto/ProdutoDTO'; 

const API_URL = import.meta.env.VITE_API_SERVER_URL;

class ProdutoRequests {

    private serverUrl: string;
    private endpointProduto: string;

    constructor() {
        this.serverUrl = API_URL;
        this.endpointProduto = '/api/produtos'; // ajuste se sua rota for diferente
    }

    private getAuthHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };
    }

    async obterListaDeProdutos(): Promise<ProdutoDTO[]> {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpointProduto}`, {
                method: 'GET',
                headers: this.getAuthHeaders()
            });

            console.log('STATUS:', response.status);
            console.log('URL:', response.url);

            const data = await response.json();

            console.log('RESPOSTA DO BACKEND:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Falha ao buscar produtos');
            }

            return data;

        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async obterProdutoPorId(id_produto: number): Promise<ProdutoDTO> {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpointProduto}/${id_produto}`, {
                method: 'GET',
                headers: this.getAuthHeaders()
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Falha ao buscar produto');
            }

            return data;

        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async enviarFormularioProduto(produto: ProdutoDTO) {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpointProduto}`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(produto)
            });

            console.log('STATUS:', response.status);
            console.log('URL:', response.url);

            const data = await response.json();

            console.log('RESPOSTA DO BACKEND:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Falha ao enviar produto');
            }

            return data;

        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async atualizarProduto(id_produto: number, produto: ProdutoDTO) {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpointProduto}/${id_produto}`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(produto)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Falha ao atualizar produto');
            }

            return data;

        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async removerProduto(id_produto: number): Promise<boolean> {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpointProduto}/${id_produto}`, {
                method: 'DELETE',
                headers: this.getAuthHeaders()
            });

            console.log('STATUS:', response.status);
            console.log('URL:', response.url);

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(data?.message || 'Falha ao remover produto');
            }

            return true;

        } catch (error) {
            console.error('Erro:', error);
            return false;
        }
    }
}

export default new ProdutoRequests();