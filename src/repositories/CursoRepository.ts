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

    const sql = `
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
      ${ano ? "WHERE m.ano = $1" : ""}
      ${modalidade ? "AND c.modalidade = $2" : ""}
      GROUP BY c.id, c.nome, c.nome_detalhado, c.modalidade, c.grau
      ORDER BY total_matriculas DESC
      LIMIT $3
    `;
    const result = await pool.query(sql, [ano, modalidade, limit]);
    return result.rows;
  }
}
