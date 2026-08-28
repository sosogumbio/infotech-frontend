export interface CategoriaDTO {
  id_categoria?: number;
  nome: string;
}

export type CategoriaCreateDTO = Omit<CategoriaDTO, 'id_categoria'>;
