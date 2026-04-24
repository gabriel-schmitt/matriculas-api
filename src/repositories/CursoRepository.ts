import { ICurso, ICursoRanking } from "../models/interfaces/ICurso.js";
import { Repository } from "./@Repository.js";
import { ICursoRepository, IGetRankingCursosParams } from "./interfaces/ICursoRepository.js";
import { pool } from "../config/db.js";

export class CursoRepository extends Repository<ICurso> implements ICursoRepository {
  constructor() {
    super("curso");
  }

  async getRanking(params: IGetRankingCursosParams): Promise<ICursoRanking[]> {
    const { limit = 10, modalidade, ano } = params;

    let sql = `
      SELECT
        c.id,
        c.nome,
        c.nome_detalhado,
        c.modalidade,
        c.grau,
        SUM(m.quantidade) as total_matriculas
      FROM matricula m
      JOIN curso_ies ci ON m.curso_ies_id = ci.id
      JOIN curso c ON ci.curso_id = c.id
      WHERE 1=1
    `;
    const sqlParams: unknown[] = [];

    if (ano != null && !Number.isNaN(Number(ano))) {
      sqlParams.push(ano);
      sql += ` AND m.ano = $${sqlParams.length}`;
    }

    if (modalidade) {
      sqlParams.push(modalidade);
      sql += ` AND c.modalidade = $${sqlParams.length}`;
    }

    sqlParams.push(limit);
    sql += `
      GROUP BY c.id, c.nome, c.nome_detalhado, c.modalidade, c.grau
      ORDER BY total_matriculas DESC
      LIMIT $${sqlParams.length}
    `;

    const result = await pool.query(sql, sqlParams);
    return result.rows;
  }
}
