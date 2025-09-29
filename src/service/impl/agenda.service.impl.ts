import { Injectable } from '@nestjs/common';
import { AgendaService } from '../agenda.service';
import { AgendaItem } from '../../model/agenda.model';
import { CreateAgendaItemDto, UpdateAgendaItemDto } from '../../dto/agenda.dto';
import { FileSystemUtils } from '../../utils/file-system.utils';
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

    const nuevoEvento = new AgendaItem(createDto.titulo, createDto.fecha, createDto.hora, createDto.descripcion);

    await FileSystemUtils.escribirArchivoMarkdown(nuevoEvento);

    return nuevoEvento;
  }

}