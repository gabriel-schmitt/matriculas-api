const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const CursoMatriculaRepository = require('../repositories/CursoMatriculaRepository');

function toInt(value) {
  if (value === undefined || value === null || value === '') return null;
  const num = Number(String(value).trim().replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(num) ? Math.trunc(num) : null;
}

function mapRow(row) {
  return {
    estado: row.estado ?? row.Estado ?? null,
    cidade: row.cidade ?? row.Cidade ?? null,
    ies: row.ies ?? row.IES ?? null,
    sigla: row.sigla ?? row.Sigla ?? null,
    organizacao: row.organizacao ?? row.Organizacao ?? null,
    categoria_administrativa: row.categoria_administrativa ?? row.CategoriaAdministrativa ?? null,
    nome_do_curso: row.nome_do_curso ?? row.NomeDoCurso ?? null,
    nome_detalhado_do_curso: row.nome_detalhado_do_curso ?? row.NomeDetalhadoDoCurso ?? null,
    modalidade: row.modalidade ?? row.Modalidade ?? null,
    grau: row.grau ?? row.Grau ?? null,
    ano_2014: toInt(row.ano_2014 ?? row.Ano2014),
    ano_2015: toInt(row.ano_2015 ?? row.Ano2015),
    ano_2016: toInt(row.ano_2016 ?? row.Ano2016),
    ano_2017: toInt(row.ano_2017 ?? row.Ano2017),
    ano_2018: toInt(row.ano_2018 ?? row.Ano2018),
    ano_2019: toInt(row.ano_2019 ?? row.Ano2019),
    ano_2020: toInt(row.ano_2020 ?? row.Ano2020),
    ano_2021: toInt(row.ano_2021 ?? row.Ano2021),
    ano_2022: toInt(row.ano_2022 ?? row.Ano2022),
  };
}

async function importCsv() {
  const filePath = path.join(__dirname, '../../data/cursos_matriculas.csv');
  const rows = [];

  fs.createReadStream(filePath)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => rows.push(mapRow(row)))
    .on('end', async () => {
      try {
        console.log(`Lidas ${rows.length} linhas do CSV.`);

        for (const row of rows) {
          await CursoMatriculaRepository.create(row);
        }

        console.log('Importação concluída com sucesso.');
        process.exit(0);
      } catch (error) {
        console.error('Erro ao importar CSV:', error);
        process.exit(1);
      }
    });
}

importCsv();