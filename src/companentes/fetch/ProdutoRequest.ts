import api from "./api"
import type { ProdutoDTO } from "../dto/ProdutoDTO";

export async function listarProdutos() {
  const response = await api.get("/api/produtos");
  return response.data;
}

export async function cadastrarProduto(produto: ProdutoDTO) {
  const response = await api.post("/api/produtos", produto);
  return response.data;
}

