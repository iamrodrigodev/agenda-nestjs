export interface CreateAgendaItemDto {
  titulo: string;
  fecha: string;
  hora: string;
  descripcion?: string;
}

export interface UpdateAgendaItemDto {
  titulo?: string;
  fecha?: string;
  hora?: string;
  descripcion?: string;
}