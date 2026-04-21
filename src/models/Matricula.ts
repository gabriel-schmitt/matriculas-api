import { IMatricula } from "./interfaces/IMatricula.js";

export class Matricula implements IMatricula {
  public readonly tableName = "matricula";

  constructor(
    public id: number,
    public curso_ies_id: number,
    public ano: number,
    public quantidade: number
  ) {}
}
