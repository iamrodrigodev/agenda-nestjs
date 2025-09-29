import * as NestCommon from '@nestjs/common';
import { AgendaService } from '../service/agenda.service';
import type { CreateAgendaItemDto, UpdateAgendaItemDto } from '../dto/agenda.dto';
import type { AgendaItem } from '../model/agenda.model';

@NestCommon.Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @NestCommon.Post()
  async crearEvento(@NestCommon.Body() createDto: CreateAgendaItemDto): Promise<{
    mensaje: string;
    evento: AgendaItem;
  }> {
    try {
      const evento = await this.agendaService.crearEvento(createDto);
      return {
        mensaje: 'Evento creado exitosamente',
        evento
      };
    } catch (error) {
      throw new NestCommon.HttpException(
        error.message || 'Error al crear el evento',
        NestCommon.HttpStatus.BAD_REQUEST
      );
    }
  }
}