import api from './api'
import type { MovimentacaoDTO, MovimentacaoCreateDTO } from '../dto/MovimentacaoDTO'

export async function listarMovimentacoes() {
  const response = await api.get('/api/movimentacoes')
  return response.data as MovimentacaoDTO[]
}

export async function cadastrarMovimentacao(mov: MovimentacaoCreateDTO) {
  const response = await api.post('/api/movimentacoes', mov)
  return response.data as MovimentacaoDTO
}

export async function buscarMovimentacao(id: number) {
  const response = await api.get(`/api/movimentacoes/${id}`)
  return response.data as MovimentacaoDTO
}
