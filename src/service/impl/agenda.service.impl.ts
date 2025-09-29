import { Injectable } from '@nestjs/common';
import { AgendaService } from '../agenda.service';
import { AgendaItem } from '../../model/agenda.model';
import { CreateAgendaItemDto} from '../../dto/agenda.dto';
import { FileSystemUtils } from '../../utils/file-system.utils';
import { FileSystemUtilsExtended } from '../../utils/file-system-extended.utils';
import { NormalizationUtils } from '../../utils/normalization.utils';
import { ValidationUtils } from '../../utils/validation.utils';

@Injectable()
export class AgendaServiceImpl implements AgendaService {
  constructor() {
    FileSystemUtils.inicializarDirectorio();
  }

  async crearEvento(createDto: CreateAgendaItemDto): Promise<AgendaItem> {
    const validacion = ValidationUtils.validarDatos(createDto);
    if (!validacion.valido) {
      throw new Error(`Datos inválidos: ${validacion.errores.join(', ')}`);
    }
    
    const hoy = new Date();
    const fechaEvento = new Date(`${createDto.fecha}T${createDto.hora}`);
    if (fechaEvento < hoy) {
      throw new Error('No se pueden crear eventos en fechas pasadas');
    }

    const eventosExistentes = await FileSystemUtilsExtended.listarEventosPorFecha(createDto.fecha);
    const tituloNormalizado = NormalizationUtils.normalizarTitulo(createDto.titulo);
    for (const evento of eventosExistentes) {
      if (NormalizationUtils.normalizarTitulo(evento.titulo) === tituloNormalizado) {
        throw new Error('Ya existe un evento con el mismo título en esa fecha');
      }
      if (evento.hora === createDto.hora) {
        throw new Error('Ya existe un evento con la misma hora en esa fecha');
      }
    }

    const nuevoEvento = new AgendaItem(createDto.titulo, createDto.fecha, createDto.hora, createDto.descripcion);
    await FileSystemUtils.escribirArchivoMarkdown(nuevoEvento);
    return nuevoEvento;
  }

}