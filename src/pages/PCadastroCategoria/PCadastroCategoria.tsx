import { useState } from 'react'
import { cadastrarCategoria } from '../../componentes/fetch/CategoriaRequest'
import type { CategoriaCreateDTO } from '../../componentes/dto/CategoriaDTO'

export default function PCadastroCategoria() {
  const [nome, setNome] = useState('')
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim()) {
      setStatus({ type: 'error', message: 'Nome é obrigatório' })
      return
    }

    const dto: CategoriaCreateDTO = { nome }
    try {
      await cadastrarCategoria(dto)
      setStatus({ type: 'success', message: 'Categoria cadastrada' })
      setNome('')
    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', message: 'Erro ao cadastrar' })
    }
  }

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Cadastrar Categoria</h2>

        {status.type && (
          <div className={`alert alert-${status.type}`}>{status.message}</div>
        )}

        <div className="form-grid" style={{ marginTop: 18 }}>
          <div style={{ flex: '1 1 320px' }} className="form-field">
            <input name="nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
          <button type="submit" className="btn btn-primary">Salvar</button>
        </div>
      </form>
    </div>
  )
}
