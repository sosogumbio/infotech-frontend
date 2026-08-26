const Produtorequest = {
  async listar(): Promise<unknown[]> {
    try {
      const urlBase = import.meta.env.VITE_API_URL ?? "";
      const resposta = await fetch(`${urlBase}/produtos`);

      if (!resposta.ok) {
        return [];
      }

      return (await resposta.json().catch(() => [])) as unknown[];
    } catch {
      return [];
    }
  },
};

export default Produtorequest;