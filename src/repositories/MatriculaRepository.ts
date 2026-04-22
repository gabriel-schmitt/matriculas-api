import { IMatricula, ITotalMatriculadosAno } from "../models/interfaces/IMatricula.js";
import { Repository } from "./@Repository.js";
import { IGetTotalMatriculadosParams, IMatriculaRepository } from "./interfaces/IMatriculaRepository.js";
import { pool } from "../config/db.js";

export class MatriculaRepository extends Repository<IMatricula> implements IMatriculaRepository {
  constructor() {
    super("matricula");
  }

  async getTotalMatriculados(params: IGetTotalMatriculadosParams): Promise<ITotalMatriculadosAno[]> {
    const { modalidade } = params;
    
    let sql = `
      SELECT m.ano, SUM(m.quantidade) as total_matriculas
      FROM matricula m
    `;
    const sqlParams: any[] = [];
    
    if (modalidade && modalidade !== 'Todos') {
      sql += `
        JOIN curso_ies ci ON m.curso_ies_id = ci.id
        JOIN curso c ON ci.curso_id = c.id
      `;
    }

    let whereClause = [];
    if (modalidade && modalidade !== 'Todos') {
      sqlParams.push(modalidade);
      whereClause.push(`c.modalidade = $${sqlParams.length}`);
    }

    if (whereClause.length > 0) {
      sql += ` WHERE ` + whereClause.join(' AND ');
    }

    sql += ` GROUP BY m.ano ORDER BY m.ano DESC`;

    const result = await pool.query(sql, sqlParams);
    return result.rows.map(row => ({
      ano: row.ano,
      total_matriculas: Number(row.total_matriculas)
    }));
  }
}
