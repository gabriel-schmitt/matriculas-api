import { ICurso } from "./interfaces/ICurso.js";

export class Curso implements ICurso {
  public readonly tableName = "curso";

  constructor(
    public id: number,
    public nome: string,
    public nome_detalhado: string,
    public modalidade: string,
    public grau: string
  ) {}
}