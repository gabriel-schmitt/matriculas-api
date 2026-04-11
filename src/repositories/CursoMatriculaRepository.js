const pool = require('../config/db');

const ENROLLMENT_YEAR_KEYS = [
  '2014', '2015', '2016', '2017', '2018',
  '2019', '2020', '2021', '2022',
];

function normalizeModalidadeParam(value) {
  const v = String(value ?? 'todos').toLowerCase();
  if (v === 'ead' || v === 'presencial' || v === 'todos') return v;
  return 'todos';
}

function normalizeTipoParam(value) {
  const v = String(value ?? 'todos').toLowerCase();
  if (v === 'publica' || v === 'privada' || v === 'todos') return v;
  return 'todos';
}

/** SQL fragment: filter rows by modalidade de ensino (column `modalidade`). */
function modalidadeRowFilterSql(modalidade) {
  const m = normalizeModalidadeParam(modalidade);
  if (m === 'todos') return { clause: '', params: [] };
  if (m === 'ead') {
    return {
      clause: ` AND (
        LOWER(COALESCE(modalidade, '')) LIKE '%distância%'
        OR LOWER(COALESCE(modalidade, '')) LIKE '%distancia%'
        OR LOWER(COALESCE(modalidade, '')) LIKE '%ead%'
      )`,
      params: [],
    };
  }
  return {
    clause: ` AND NOT (
      LOWER(COALESCE(modalidade, '')) LIKE '%distância%'
      OR LOWER(COALESCE(modalidade, '')) LIKE '%distancia%'
      OR LOWER(COALESCE(modalidade, '')) LIKE '%ead%'
    )`,
    params: [],
  };
}

class CursoMatriculaRepository {
  async create(curso) {
    const sql = `
      INSERT INTO cursos_matriculas (
        estado, cidade, ies, sigla, organizacao,
        categoria_administrativa, nome_do_curso,
        nome_detalhado_do_curso, modalidade, grau,
        ano_2014, ano_2015, ano_2016, ano_2017, ano_2018,
        ano_2019, ano_2020, ano_2021, ano_2022
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15,
        $16, $17, $18, $19
      )
      RETURNING *;
    `;

    const values = [
      curso.estado,
      curso.cidade,
      curso.ies,
      curso.sigla,
      curso.organizacao,
      curso.categoria_administrativa,
      curso.nome_do_curso,
      curso.nome_detalhado_do_curso,
      curso.modalidade,
      curso.grau,
      curso.ano_2014,
      curso.ano_2015,
      curso.ano_2016,
      curso.ano_2017,
      curso.ano_2018,
      curso.ano_2019,
      curso.ano_2020,
      curso.ano_2021,
      curso.ano_2022,
    ];

    const result = await pool.query(sql, values);
    return result.rows[0];
  }

  async findAll(limit = 10) {
    const result = await pool.query(
      'SELECT * FROM cursos_matriculas ORDER BY id LIMIT $1',
      [limit]
    );
    return result.rows;
  }

  /**
   * Totais de matrículas por ano (soma de todas as linhas), opcionalmente filtrado por modalidade.
   * @returns {Promise<Array<{ ano: number, total: number }>>}
   */
  async getEnrollmentsByYear(modalidade) {
    const { clause } = modalidadeRowFilterSql(modalidade);
    const sumCols = ENROLLMENT_YEAR_KEYS.map(
      (y) => `SUM(COALESCE(ano_${y}, 0))::bigint AS y${y}`
    ).join(', ');
    const sql = `SELECT ${sumCols} FROM cursos_matriculas WHERE 1 = 1${clause}`;
    const { rows } = await pool.query(sql);
    const row = rows[0] ?? {};
    return ENROLLMENT_YEAR_KEYS.map((y) => ({
      ano: Number(y),
      total: Number(row[`y${y}`] ?? 0),
    }));
  }

  /**
   * Top cursos por soma de matrículas no ano mais recente com coluna no schema (2022).
   * @returns {Promise<Array<{ curso: string, alunos: number }>>}
   */
  async getCourseRanking(modalidade) {
    const { clause, params } = modalidadeRowFilterSql(modalidade);
    const sql = `
      SELECT nome_do_curso AS curso, SUM(COALESCE(ano_2022, 0))::bigint AS alunos
      FROM cursos_matriculas
      WHERE nome_do_curso IS NOT NULL AND TRIM(nome_do_curso) <> ''
      ${clause}
      GROUP BY nome_do_curso
      ORDER BY alunos DESC NULLS LAST
      LIMIT 10
    `;
    const { rows } = await pool.query(sql, params);
    return rows.map((r) => ({
      curso: r.curso,
      alunos: Number(r.alunos ?? 0),
    }));
  }

  /**
   * Ranking de IES (agregado por ies + tipo administrativo + modalidade).
   * @returns {Promise<Array<{ ies: string, tipo: string, modalidade: string, alunos: number }>>}
   */
  async getIESRanking(filters) {
    const tipo = normalizeTipoParam(filters?.tipo);
    const mod = normalizeModalidadeParam(filters?.modalidade);

    const conditions = [];
    const params = [];
    let i = 1;
    if (tipo !== 'todos') {
      conditions.push(`tipo_mapped = $${i++}`);
      params.push(tipo);
    }
    if (mod !== 'todos') {
      conditions.push(`mod_mapped = $${i++}`);
      params.push(mod);
    }
    const filterSql = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const sql = `
      SELECT ies, tipo_mapped AS tipo, mod_mapped AS modalidade, SUM(alunos)::bigint AS alunos
      FROM (
        SELECT
          ies,
          CASE
            WHEN LOWER(COALESCE(categoria_administrativa, '')) LIKE '%pública%'
              OR LOWER(COALESCE(categoria_administrativa, '')) LIKE '%publica%'
            THEN 'publica'
            ELSE 'privada'
          END AS tipo_mapped,
          CASE
            WHEN LOWER(COALESCE(modalidade, '')) LIKE '%distância%'
              OR LOWER(COALESCE(modalidade, '')) LIKE '%distancia%'
              OR LOWER(COALESCE(modalidade, '')) LIKE '%ead%'
            THEN 'ead'
            ELSE 'presencial'
          END AS mod_mapped,
          COALESCE(ano_2022, 0)::numeric AS alunos
        FROM cursos_matriculas
        WHERE ies IS NOT NULL AND TRIM(ies) <> ''
      ) raw
      ${filterSql}
      GROUP BY ies, tipo_mapped, mod_mapped
      ORDER BY alunos DESC NULLS LAST
      LIMIT 100
    `;
    const { rows } = await pool.query(sql, params);
    return rows.map((r) => ({
      ies: r.ies,
      tipo: r.tipo,
      modalidade: r.modalidade,
      alunos: Number(r.alunos ?? 0),
    }));
  }
}

module.exports = new CursoMatriculaRepository();