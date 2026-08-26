export default interface MovimentacaoDTO {
  id_movimentacao: number;
  id_produto: number;
  id_movimentacao_origem?: number | null;
  quantidade: number;
  data_movimentacao: string;
  preco_unitario: number;
  valor_total: number;
  tipo_movimentacao: string;
  motivo?: string | null;
  observacao?: string | null;
}