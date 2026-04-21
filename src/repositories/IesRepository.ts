import { IIes } from "../models/interfaces/IIes.js";
import { Repository } from "./@Repository.js";
import { IIesRepository } from "./interfaces/IIesRepository.js";
import { pool } from "../config/db.js";

export class IesRepository extends Repository<IIes> implements IIesRepository {
  constructor() {
    super("ies");
  }

  async getRankingIes(limit: number, modalidade: string, tipoCategoria: string, ano: number): Promise<any> {
    let sql = `
      SELECT i.nome, i.sigla, i.categoria_administrativa, SUM(m.quantidade) as total_matriculas
      FROM matricula m
      JOIN curso_ies ci ON m.curso_ies_id = ci.id
      JOIN ies i ON ci.ies_id = i.id
      JOIN curso c ON ci.curso_id = c.id
      WHERE m.ano = $1 AND c.modalidade = $2
    `;
    const params: any[] = [ano, modalidade];

    if (tipoCategoria === 'Pública' || tipoCategoria === 'Privada') {
      params.push(tipoCategoria + '%');
      sql += ` AND i.categoria_administrativa LIKE $3`;
    }

    sql += `
      GROUP BY i.id, i.nome, i.sigla, i.categoria_administrativa
      ORDER BY total_matriculas DESC
      LIMIT $${params.length + 1}
    `;
    params.push(limit);

    const result = await pool.query(sql, params);
    return result.rows;
  }
}
