import { Injectable } from '@nestjs/common';
import { AgendaItem } from '../model/agenda.model';
import { CreateAgendaItemDto} from '../dto/agenda.dto';

@Injectable()
export abstract class AgendaService {

  abstract crearEvento(createDto: CreateAgendaItemDto): Promise<AgendaItem>;

}