export default interface CategoriaDTO {
  id_categoria?: number;
  nome?: string;
  descricao?: string | null;
  ativo?: boolean;
  created_at?: string;
}