import { CreateAgendaItemDto, UpdateAgendaItemDto } from '../dto/agenda.dto';

export class ValidationUtils {

  static validarDatos(datos: CreateAgendaItemDto | UpdateAgendaItemDto): { valido: boolean; errores: string[] } {
    const errores: string[] = [];
    if (!datos.titulo || datos.titulo.trim().length === 0) {
      errores.push('El título es obligatorio y no puede estar vacío');
    }
    if (!datos.fecha || datos.fecha.trim().length === 0) {
      errores.push('La fecha es obligatoria y no puede estar vacía');
    } else {
      const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!fechaRegex.test(datos.fecha)) {
        errores.push('La fecha debe tener el formato YYYY-MM-DD');
      }
    }
    if (!datos.hora || datos.hora.trim().length === 0) {
      errores.push('La hora es obligatoria y no puede estar vacía');
    } else {
      const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      if (!horaRegex.test(datos.hora)) {
        errores.push('La hora debe tener el formato HH:MM (24h)');
      }
    }
    return {
      valido: errores.length === 0,
      errores
    };
  }
}