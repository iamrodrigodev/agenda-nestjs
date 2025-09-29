import { promises as fs } from 'fs';
import * as path from 'path';
import { AgendaItem } from '../model/agenda.model';

export class FileSystemUtils {
  private static readonly basePath = path.join(process.cwd(), 'agendas');

  static async inicializarDirectorio(): Promise<void> {
    try {
      await fs.access(this.basePath);
    } catch {
      await fs.mkdir(this.basePath, { recursive: true });
    }
  }

  static async escribirArchivoMarkdown(item: AgendaItem): Promise<void> {
    const fechaPath = path.join(this.basePath, item.fecha);
    try {
      await fs.access(fechaPath);
    } catch {
      await fs.mkdir(fechaPath, { recursive: true });
    }
    const archivoPath = path.join(fechaPath, `${item.hora.replace(':', '-')}.md`);
    const contenido = item.toMarkdown();
    await fs.writeFile(archivoPath, contenido, 'utf8');
  }
}