import { IIes } from "./interfaces/IIes.js";

export class Ies implements IIes {
  public readonly tableName = "ies";

  constructor(
    public id: number,
    public estado: string,
    public cidade: string,
    public nome: string,
    public sigla: string,
    public organizacao: string,
    public categoria_administrativa: string
  ) {}
}
