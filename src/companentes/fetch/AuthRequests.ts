interface LoginPayload {
  email: string;
  senha: string;
}

const AuthRequests = {
  async login(payload: LoginPayload): Promise<boolean> {
    try {
      const urlBase = import.meta.env.VITE_API_URL ?? "";
      const resposta = await fetch(`${urlBase}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!resposta.ok) {
        return false;
      }

      const dados = await resposta.json().catch(() => ({}));
      return Boolean(dados?.sucesso ?? true);
    } catch {
      return false;
    }
  },
};

export default AuthRequests;