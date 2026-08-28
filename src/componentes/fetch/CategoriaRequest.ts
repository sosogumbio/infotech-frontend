import api from './api'
import type { CategoriaDTO, CategoriaCreateDTO } from '../dto/CategoriaDTO'

export async function listarCategorias() {
  const response = await api.get('/api/categorias')
  return response.data as CategoriaDTO[]
}

export async function cadastrarCategoria(categoria: CategoriaCreateDTO) {
  const response = await api.post('/api/categorias', categoria)
  return response.data as CategoriaDTO
}

export async function atualizarCategoria(id: number, categoria: Partial<CategoriaCreateDTO>) {
  const response = await api.put(`/api/categorias/${id}`, categoria)
  return response.data as CategoriaDTO
}

export async function excluirCategoria(id: number) {
  const response = await api.delete(`/api/categorias/${id}`)
  return response.data
}
