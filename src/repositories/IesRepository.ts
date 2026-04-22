import { IIes, IIesRanking } from "../models/interfaces/IIes.js";
import { Repository } from "./@Repository.js";
import { IIesRepository, IGetRankingIesParams } from "./interfaces/IIesRepository.js";
import { pool } from "../config/db.js";

export class IesRepository extends Repository<IIes> implements IIesRepository {
  constructor() {
    super("ies");
  }

  async getRankingIes(params: IGetRankingIesParams): Promise<IIesRanking[]> {
    const { limit = 10, modalidade, categoria_administrativa, ano } = params;

    let sql = `
      SELECT i.id, i.nome, i.sigla, i.categoria_administrativa, SUM(m.quantidade) as total_matriculas
      FROM matricula m
      JOIN curso_ies ci ON m.curso_ies_id = ci.id
      JOIN ies i ON ci.ies_id = i.id
      JOIN curso c ON ci.curso_id = c.id
      WHERE 1=1
    `;
    const sqlParams: any[] = [];

    if (ano) {
      sqlParams.push(ano);
      sql += ` AND m.ano = $${sqlParams.length}`;
    }

    if (modalidade) {
      sqlParams.push(modalidade);
      sql += ` AND c.modalidade = $${sqlParams.length}`;
    }

    if (categoria_administrativa) {
      const normalizedCategoria = categoria_administrativa.toLowerCase() === 'publica' ? 'Pública' : categoria_administrativa;
      sqlParams.push(normalizedCategoria + '%');
      sql += ` AND i.categoria_administrativa LIKE $${sqlParams.length}`;
    }

    sqlParams.push(limit);
    sql += `
      GROUP BY i.id, i.nome, i.sigla, i.categoria_administrativa
      ORDER BY total_matriculas DESC
      LIMIT $${sqlParams.length}
    `;

    const result = await pool.query(sql, sqlParams);
    return result.rows;
  }
}
