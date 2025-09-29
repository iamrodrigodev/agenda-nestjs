import * as NestCommon from '@nestjs/common';
import { AgendaService } from '../service/agenda.service';
import type { CreateAgendaItemDto } from '../dto/agenda.dto';
import type { AgendaItem } from '../model/agenda.model';

@NestCommon.Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @NestCommon.Post()
  async crearEvento(@NestCommon.Body() createDto: CreateAgendaItemDto): Promise<{
  mensaje: string;
  evento: AgendaItem;
  status: number;
  }> {
    try {
      const evento = await this.agendaService.crearEvento(createDto);
      return {
        mensaje: 'Evento creado exitosamente',
        evento,
        status: NestCommon.HttpStatus.OK
      };
    } catch (error) {
      let mensaje = 'Error al crear el evento';
      if (error instanceof Error) {
        mensaje = error.message;
      }
      throw new NestCommon.HttpException(
        mensaje,
        NestCommon.HttpStatus.BAD_REQUEST
      );
    }
  }
}