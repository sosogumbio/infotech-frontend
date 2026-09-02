class Utilitario {
    // Formata a data no padrão DD/MM/AAAA
    formatarData(data: string | Date): string {
        return new Date(data).toLocaleDateString("pt-br", { timeZone: "UTC" });
    }

    // Formata a data e hora no padrão DD/MM/AAAA HH:mm
    formatarDataHora(data: string | Date): string {
        return new Date(data).toLocaleString("pt-br", { timeZone: "UTC" });
    }

    // Remove as informações de hora de um objeto Date (para uso em inputs type="date")
    formatarDataParaInput(data: string | Date | undefined): string {
        if (!data) return '';
        const d = new Date(data);
        return d.toISOString().split('T')[0];
    }

    // Formata moeda no valor Real BRL
    formatarParaReal(valor: number): string {
        return new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }

    // Valida um e-mail através de uma expressão regular
    validarEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Valida o código de um produto.
     * Regras: obrigatório, entre 3 e 20 caracteres, apenas letras, números e hífen.
     */
    validarCodigoProduto(codigo: string): boolean {
        const regex = /^[A-Za-z0-9-]{3,20}$/;
        return regex.test(codigo);
    }

    /**
     * Valida se um valor numérico é positivo (maior ou igual a zero).
     */
    validarValorPositivo(valor: number): boolean {
        return typeof valor === 'number' && !Number.isNaN(valor) && valor >= 0;
    }

    /**
     * Valida se uma string obrigatória não está vazia (ignorando espaços) e
     * respeita um tamanho mínimo/máximo opcional.
     */
    validarTexto(texto: string, min = 1, max = 255): boolean {
        const tamanho = texto.trim().length;
        return tamanho >= min && tamanho <= max;
    }

    /**
     * Valida se a quantidade mínima de estoque não é maior que a quantidade disponível.
     * Regra de negócio simples do infotech: evita cadastro inconsistente.
     */
    validarEstoqueMinimo(quantidadeDisponivel: number, quantidadeMinima: number): boolean {
        return quantidadeMinima >= 0 && quantidadeMinima <= quantidadeDisponivel;
    }
}

export default new Utilitario();