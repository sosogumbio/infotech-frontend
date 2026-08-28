import { useEffect, useState } from "react";
import { listarProdutos } from "../../componentes/fetch/ProdutoRequest";
import type { ProdutoDTO } from "../../componentes/dto/ProdutoDTO";

export default function PListagemProdutos() {
  const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);

  useEffect(() => {
    listarProdutos()
      .then(setProdutos)
      .catch((erro) => console.error(erro));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: 12 }}>Produtos</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.codigo}>
                  <td>{produto.codigo}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.preco_unitario}</td>
                  <td>{produto.quantidade_disponivel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}