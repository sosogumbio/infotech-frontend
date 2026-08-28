import { useState } from "react";
import { cadastrarProduto } from "../../companentes/fetch/ProdutoRequest";
import type { ProdutoDTO } from "../../companentes/dto/ProdutoDTO";

export default function PCadastroProduto() {
  const [form, setForm] = useState({
    id_categoria: "",
    codigo: "",
    nome: "",
    preco_unitario: "",
    quantidade_disponivel: "",
    quantidade_minima: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setStatus({ type: '', message: '' });
  }

  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const produto: ProdutoDTO = {
      id_categoria: Number(form.id_categoria),
      codigo: form.codigo,
      nome: form.nome,
      preco_unitario: Number(form.preco_unitario),
      quantidade_disponivel: Number(form.quantidade_disponivel),
      quantidade_minima: Number(form.quantidade_minima),
    };

    const newErrors: Record<string, string> = {};
    if (!form.codigo) newErrors.codigo = 'Obrigatório';
    if (!form.nome) newErrors.nome = 'Obrigatório';
    if (!form.preco_unitario || Number.isNaN(Number(form.preco_unitario))) newErrors.preco_unitario = 'Número inválido';
    if (!form.id_categoria || Number.isNaN(Number(form.id_categoria))) newErrors.id_categoria = 'Número inválido';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setStatus({ type: 'error', message: 'Corrija os campos destacados.' });
      return;
    }

    try {
      await cadastrarProduto(produto);
      setStatus({ type: 'success', message: 'Produto cadastrado com sucesso!' });
      setForm({ id_categoria: '', codigo: '', nome: '', preco_unitario: '', quantidade_disponivel: '', quantidade_minima: '' });
      setErrors({});
    } catch (erro) {
      console.error(erro);
      setStatus({ type: 'error', message: 'Erro ao cadastrar produto' });
    }
  }

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Cadastrar Produto</h2>

        {status.type && (
          <div className={`alert alert-${status.type}`}>{status.message}</div>
        )}

        <div className="row form-grid" style={{ gap: 12 }}>
          <div style={{ flex: '1 1 140px' }} className="form-field">
            <input
              name="id_categoria"
              placeholder="ID Categoria"
              value={form.id_categoria}
              onChange={handleChange}
              className={errors.id_categoria ? 'input-error' : ''}
              aria-invalid={!!errors.id_categoria}
            />
          </div>
          <div style={{ flex: '1 1 140px' }} className="form-field">
            <input
              name="codigo"
              placeholder="Código"
              value={form.codigo}
              onChange={handleChange}
              className={errors.codigo ? 'input-error' : ''}
              aria-invalid={!!errors.codigo}
            />
          </div>
          <div style={{ flex: '2 1 240px' }} className="form-field">
            <input
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              className={errors.nome ? 'input-error' : ''}
              aria-invalid={!!errors.nome}
            />
          </div>
          <div style={{ flex: '1 1 160px' }} className="form-field">
            <input
              name="preco_unitario"
              placeholder="Preço unitário"
              value={form.preco_unitario}
              onChange={handleChange}
              className={errors.preco_unitario ? 'input-error' : ''}
              aria-invalid={!!errors.preco_unitario}
            />
          </div>
          <div style={{ flex: '1 1 160px' }} className="form-field">
            <input
              name="quantidade_disponivel"
              placeholder="Quantidade disponível"
              value={form.quantidade_disponivel}
              onChange={handleChange}
            />
          </div>
          <div style={{ flex: '1 1 160px' }} className="form-field">
            <input
              name="quantidade_minima"
              placeholder="Quantidade mínima"
              value={form.quantidade_minima}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}