import { IIes, IIesRanking } from "../models/interfaces/IIes.js";
import { Repository } from "./@Repository.js";
import {
  IIesRepository,
  IGetRankingIesParams,
} from "./interfaces/IIesRepository.js";
import { pool } from "../config/db.js";

export class IesRepository extends Repository<IIes> implements IIesRepository {
  constructor() {
    super("ies");
  }

  async getRankingIes(params: IGetRankingIesParams): Promise<IIesRanking[]> {
    const { limit = 10, modalidade, categoria_administrativa, ano } = params;

    let where = "WHERE 1=1";
    const sqlParams: unknown[] = [];

    if (ano) {
      sqlParams.push(ano);
      where += ` AND m.ano = $${sqlParams.length}`;
    }

    if (modalidade) {
      sqlParams.push(modalidade);
      where += ` AND c.modalidade = $${sqlParams.length}`;
    }

    if (categoria_administrativa) {
      const cat = String(categoria_administrativa).trim();
      const lower = cat.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
      let prefix = cat;
      if (lower === "publica") {
        prefix = "Pública";
      } else if (lower === "privada") {
        prefix = "Privada";
      }
      sqlParams.push(prefix + "%");
      where += ` AND i.categoria_administrativa LIKE $${sqlParams.length}`;
    }

    sqlParams.push(limit);
    const limitIdx = sqlParams.length;

    const sql = `
      WITH mod_totals AS (
        SELECT
          i.id,
          i.nome,
          i.sigla,
          i.categoria_administrativa,
          c.modalidade,
          SUM(m.quantidade) AS q
        FROM matricula m
        JOIN curso_ies ci ON m.curso_ies_id = ci.id
        JOIN ies i ON ci.ies_id = i.id
        JOIN curso c ON ci.curso_id = c.id
        ${where}
        GROUP BY i.id, i.nome, i.sigla, i.categoria_administrativa, c.modalidade
      ),
      ies_sum AS (
        SELECT
          id,
          nome,
          sigla,
          categoria_administrativa,
          SUM(q) AS total_matriculas
        FROM mod_totals
        GROUP BY id, nome, sigla, categoria_administrativa
      ),
      pred AS (
        SELECT DISTINCT ON (id)
          id,
          modalidade AS modalidade_predominante
        FROM mod_totals
        ORDER BY id, q DESC NULLS LAST
      )
      SELECT
        s.id,
        s.nome,
        s.sigla,
        s.categoria_administrativa,
        s.total_matriculas,
        p.modalidade_predominante
      FROM ies_sum s
      JOIN pred p ON p.id = s.id
      ORDER BY s.total_matriculas DESC
      LIMIT $${limitIdx}
    `;

    const result = await pool.query(sql, sqlParams);
    return result.rows;
  }
}
