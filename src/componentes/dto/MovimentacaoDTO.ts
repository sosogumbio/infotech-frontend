export interface MovimentacaoDTO {
  id_movimentacao?: number | string;
  id_produto: number;
  id_movimentacao_origem?: number | null;
  tipo: 'entrada' | 'saida' | string;
  motivo: string;
  quantidade: number;
  preco_unitario_praticado?: number | null;
  valor_total?: number | null;
  observacao?: string;
  data_movimentacao?: string;
}

export type MovimentacaoCreateDTO = Omit<MovimentacaoDTO, 'id_movimentacao' | 'data_movimentacao'>;
