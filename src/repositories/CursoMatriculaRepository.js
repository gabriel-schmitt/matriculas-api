const pool = require('../config/db');

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
}

module.exports = new CursoMatriculaRepository();