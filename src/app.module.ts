import { Module } from '@nestjs/common';
import { AgendaController } from './controller/agenda.controller';
import { AgendaService } from './service/agenda.service';
import { AgendaServiceImpl } from './service/impl/agenda.service.impl';

@Module({
  imports: [],
  controllers: [AgendaController],
  providers: [
    {
      provide: AgendaService,
      useClass: AgendaServiceImpl,
    },
  ],
})
export class AppModule {}