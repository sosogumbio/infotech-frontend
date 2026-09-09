import type CategoriaDTO from "../dto/CategoriaDTO";
const API_URL = import.meta.env.VITE_API_SERVER_URL;

class CategoriaRequests {
    listarCategorias() {
        throw new Error('Method not implemented.');
    }
    private serverUrl;
    private endpointCategoria;
    constructor() {
        this.serverUrl = API_URL;
        this.endpointCategoria = '/api/categorias';
    }
    async obterListaDeCategorias() {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointCategoria}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });
            if (respostaAPI.ok) {
                const listaDeCategorias = await respostaAPI.json();
                return listaDeCategorias;
            } else {
                throw new Error(`Não foi possível listar as categorias.`);
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de categorias. ${error}`);
            return;
        }
    }
    async obterCategoriaPorId(id_categoria: number): Promise<CategoriaDTO | undefined> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointCategoria}/${id_categoria}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });
            if (respostaAPI.ok) {
                const categoria: CategoriaDTO = await respostaAPI.json();
                return categoria;
            } else {
                throw new Error("Não foi possível buscar a categoria.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de categoria por ID. ${error}`);
            return;
        }
    }
    async enviarFormularioCategoria(formCategoria: CategoriaDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointCategoria}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formCategoria)
            });
            if(!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);
            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }
    async atualizarCategoria(id_categoria: number, formCategoria: CategoriaDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointCategoria}/${id_categoria}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formCategoria)
            });
            if(!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);
            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }
    async removerCategoria(id_categoria: number): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointCategoria}/${id_categoria}`, {
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
export default new CategoriaRequests;