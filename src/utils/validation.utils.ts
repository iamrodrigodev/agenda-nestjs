import { CreateAgendaItemDto, UpdateAgendaItemDto } from '../dto/agenda.dto';

export class ValidationUtils {

  static validarDatos(datos: CreateAgendaItemDto | UpdateAgendaItemDto): { valido: boolean; errores: string[] } {
    const errores: string[] = [];
    if (!datos.titulo || datos.titulo.trim().length === 0) {
        errores.push('El título es obligatorio y no puede estar vacío');
    }
    if (!datos.fecha || datos.fecha.trim().length === 0) {
        errores.push('La fecha es obligatoria y no puede estar vacía');
    }
    if (!datos.hora || datos.hora.trim().length === 0) {
        errores.push('La hora es obligatoria y no puede estar vacía');
    }
    return {
        valido: errores.length === 0,
        errores
    };
  }
}