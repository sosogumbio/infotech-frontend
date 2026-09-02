import { useEffect, useState } from 'react'
import { listarCategorias, excluirCategoria } from '../../componentes/fetch/CategoriaRequest'
import type { CategoriaDTO } from '../../dto/CategoriaDTO'

export default function PListagemCategorias() {
  const [categorias, setCategorias] = useState<CategoriaDTO[]>([])

  useEffect(() => {
    listarCategorias().then(setCategorias).catch(console.error)
  }, [])

  async function handleExcluir(id?: number) {
    if (!id) return
    if (!confirm('Confirma exclusão da categoria?')) return
    try {
      await excluirCategoria(id)
      setCategorias((prev) => prev.filter((c) => c.id_categoria !== id))
    } catch (err) {
      console.error(err)
      alert('Erro ao excluir')
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Categorias</h2>
        <div style={{ overflowX: 'auto', marginTop: 12 }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((cat) => (
                <tr key={cat.id_categoria}>
                  <td>{cat.id_categoria}</td>
                  <td>{cat.nome}</td>
                  <td>
                    <button className="btn" onClick={() => handleExcluir(cat.id_categoria)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
