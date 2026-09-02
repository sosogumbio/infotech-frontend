import { useEffect, useState } from 'react'
import { listarMovimentacoes } from '../../fetch/MovimentacaoRequest'
import type { MovimentacaoDTO } from '../../dto/MovimentacaoDTO'

export default function PListagemMovimentacoes() {
  const [movs, setMovs] = useState<MovimentacaoDTO[]>([])

  useEffect(() => {
    listarMovimentacoes().then(setMovs).catch(console.error)
  }, [])

  return (
    <div className="container">
      <div className="card">
        <h2>Movimentações</h2>
        <div style={{ overflowX: 'auto', marginTop: 12 }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Tipo</th>
                <th>Motivo</th>
                <th>Quantidade</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {movs.map((m) => (
                <tr key={m.id_movimentacao}>
                  <td>{m.id_movimentacao}</td>
                  <td>{m.id_produto}</td>
                  <td>{m.tipo}</td>
                  <td>{m.motivo}</td>
                  <td>{m.quantidade}</td>
                  <td>{m.data_movimentacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
