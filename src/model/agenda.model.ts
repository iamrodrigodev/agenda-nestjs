export class AgendaItem {
  titulo: string;
  fecha: string;
  hora: string;
  descripcion?: string;

  constructor(titulo: string, fecha: string, hora: string, descripcion?: string) {
    this.titulo = titulo;
    this.fecha = fecha;
    this.hora = hora;
    this.descripcion = descripcion;
  }

  toMarkdown(): string {
    let md = `# ${this.titulo}\n## Fecha\n${this.fecha}\n## Hora\n${this.hora}`;
    if (this.descripcion && this.descripcion.trim().length > 0) {
      md += `\n## Descripción\n${this.descripcion}`;
    }
    return md;
  }
}