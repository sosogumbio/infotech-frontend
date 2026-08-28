import { useState } from 'react'
import { cadastrarMovimentacao } from '../../componentes/fetch/MovimentacaoRequest'
import type { MovimentacaoCreateDTO } from '../../componentes/dto/MovimentacaoDTO'

export default function PCadastroMovimentacao() {
  const [form, setForm] = useState({
    id_produto: '',
    tipo: 'entrada',
    motivo: '',
    quantidade: '',
    preco_unitario_praticado: '',
    observacao: '',
  })
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setStatus({ type: '', message: '' })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.id_produto || !form.quantidade) {
      setStatus({ type: 'error', message: 'Campos obrigatórios ausentes' })
      return
    }

    const dto: MovimentacaoCreateDTO = {
      id_produto: Number(form.id_produto),
      tipo: form.tipo as any,
      motivo: form.motivo,
      quantidade: Number(form.quantidade),
      preco_unitario_praticado: form.preco_unitario_praticado ? Number(form.preco_unitario_praticado) : undefined,
      observacao: form.observacao,
    }

    try {
      await cadastrarMovimentacao(dto)
      setStatus({ type: 'success', message: 'Movimentação cadastrada' })
      setForm({ id_produto: '', tipo: 'entrada', motivo: '', quantidade: '', preco_unitario_praticado: '', observacao: '' })
    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', message: 'Erro ao cadastrar' })
    }
  }

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Cadastrar Movimentação</h2>

        {status.type && (
          <div className={`alert alert-${status.type}`}>{status.message}</div>
        )}

        <div className="form-grid" style={{ marginTop: 18 }}>
          <div style={{ flex: '1 1 180px' }} className="form-field">
            <input name="id_produto" placeholder="ID Produto" value={form.id_produto} onChange={handleChange} />
          </div>

          <div style={{ flex: '1 1 180px' }} className="form-field">
            <select name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>

          <div style={{ flex: '1 1 240px' }} className="form-field">
            <input name="motivo" placeholder="Motivo" value={form.motivo} onChange={handleChange} />
          </div>

          <div style={{ flex: '1 1 160px' }} className="form-field">
            <input name="quantidade" placeholder="Quantidade" value={form.quantidade} onChange={handleChange} />
          </div>

          <div style={{ flex: '1 1 160px' }} className="form-field">
            <input name="preco_unitario_praticado" placeholder="Preço unitário" value={form.preco_unitario_praticado} onChange={handleChange} />
          </div>

          <div style={{ flex: '1 1 100%' }} className="form-field">
            <input name="observacao" placeholder="Observação" value={form.observacao} onChange={handleChange} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
          <button type="submit" className="btn btn-primary">Salvar</button>
        </div>
      </form>
    </div>
  )
}
