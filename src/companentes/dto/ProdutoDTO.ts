export default interface ProdutoDTO {
  id_produto?: number;
  nome?: string;
  descricao?: string | null;
  preco?: number;
  quantidade_estoque?: number;
  categoria_id?: number | null;
}