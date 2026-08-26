import type CategoriaDTO from "../dto/CategoriaDTO";

const CategoriaRequest = {
  async listar(): Promise<CategoriaDTO[]> {
    try {
      const urlBase = import.meta.env.VITE_API_URL ?? "";
      const resposta = await fetch(`${urlBase}/categorias`);

      if (!resposta.ok) {
        return [];
      }

      return (await resposta.json().catch(() => [])) as CategoriaDTO[];
    } catch {
      return [];
    }
  },

  async obterCategoriaPorId(id: number): Promise<CategoriaDTO | null> {
    try {
      const urlBase = import.meta.env.VITE_API_URL ?? "";
      const resposta = await fetch(`${urlBase}/categorias/${id}`);

      if (!resposta.ok) {
        return null;
      }

      return (await resposta.json().catch(() => null)) as CategoriaDTO | null;
    } catch {
      return null;
    }
  },
};

export default CategoriaRequest;