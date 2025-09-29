import { promises as fs } from 'fs';
import * as path from 'path';
import { AgendaItem } from '../model/agenda.model';

export class FileSystemUtilsExtended {
  private static readonly basePath = path.join(process.cwd(), 'agendas');

  static async listarEventosPorFecha(fecha: string): Promise<AgendaItem[]> {
    const fechaPath = path.join(this.basePath, fecha);
    try {
      const archivos = await fs.readdir(fechaPath);
      const eventos: AgendaItem[] = [];
      for (const archivo of archivos) {
        if (archivo.endsWith('.md')) {
          const contenido = await fs.readFile(path.join(fechaPath, archivo), 'utf8');
          const tituloMatch = contenido.match(/# Título\n\[(.*)\]/);
          const horaMatch = contenido.match(/## Hora\n([\d:]+)/);
          if (tituloMatch && horaMatch) {
            eventos.push(new AgendaItem(
              tituloMatch[1],
              fecha,
              horaMatch[1],
              undefined
            ));
          }
        }
      }
      return eventos;
    } catch {
      return [];
    }
  }
}
