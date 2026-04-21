import { IMatricula } from "../models/interfaces/IMatricula.js";
import { Repository } from "./@Repository.js";
import { IMatriculaRepository } from "./interfaces/IMatriculaRepository.js";
import { pool } from "../config/db.js";

export class MatriculaRepository extends Repository<IMatricula> implements IMatriculaRepository {
  constructor() {
    super("matricula");
  }

  async getTotalMatriculados(ano?: number, modalidade?: string): Promise<any> {
    let sql = `
      SELECT m.ano, SUM(m.quantidade) as total_matriculas
      FROM matricula m
    `;
    const params: any[] = [];
    
    if (modalidade && modalidade !== 'Todos') {
      sql += `
        JOIN curso_ies ci ON m.curso_ies_id = ci.id
        JOIN curso c ON ci.curso_id = c.id
      `;
    }

    let whereClause = [];
    if (ano) {
      params.push(ano);
      whereClause.push(`m.ano = $${params.length}`);
    }
    if (modalidade && modalidade !== 'Todos') {
      params.push(modalidade);
      whereClause.push(`c.modalidade = $${params.length}`);
    }

    if (whereClause.length > 0) {
      sql += ` WHERE ` + whereClause.join(' AND ');
    }

    sql += ` GROUP BY m.ano ORDER BY m.ano`;

    const result = await pool.query(sql, params);
    return result.rows;
  }
}
