import { ICurso } from "../models/interfaces/ICurso.js";
import { Repository } from "./@Repository.js";
import { ICursoRepository } from "./interfaces/ICursoRepository.js";
import { pool } from "../config/db.js";

export class CursoRepository extends Repository<ICurso> implements ICursoRepository {
  constructor() {
    super("curso");
  }

  async getRankingCursos(limit: number, modalidade: string, ano: number): Promise<any> {
    const sql = `
      SELECT c.nome, c.nome_detalhado, SUM(m.quantidade) as total_matriculas
      FROM matricula m
      JOIN curso_ies ci ON m.curso_ies_id = ci.id
      JOIN curso c ON ci.curso_id = c.id
      WHERE m.ano = $1 AND c.modalidade = $2
      GROUP BY c.id, c.nome, c.nome_detalhado
      ORDER BY total_matriculas DESC
      LIMIT $3
    `;
    const result = await pool.query(sql, [ano, modalidade, limit]);
    return result.rows;
  }
}
