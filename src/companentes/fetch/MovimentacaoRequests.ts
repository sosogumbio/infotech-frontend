import type MovimentacaoDTO from "../dto/MovimentacaoDTO";

const MovimentacaoRequests = {
  async listarMovimentacoes(): Promise<MovimentacaoDTO[]> {
    try {
      const urlBase = import.meta.env.VITE_API_URL ?? "";
      const resposta = await fetch(`${urlBase}/movimentacoes`);

      if (!resposta.ok) {
        return [];
      }

      return (await resposta.json().catch(() => [])) as MovimentacaoDTO[];
    } catch {
      return [];
    }
  },

  async obterMovimentacaoPorId(id: number): Promise<MovimentacaoDTO | null> {
    try {
      const urlBase = import.meta.env.VITE_API_URL ?? "";
      const resposta = await fetch(`${urlBase}/movimentacoes/${id}`);

      if (!resposta.ok) {
        return null;
      }

      return (await resposta.json().catch(() => null)) as MovimentacaoDTO | null;
    } catch {
      return null;
    }
  },
};

export default MovimentacaoRequests;