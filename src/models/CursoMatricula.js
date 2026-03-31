class CursoMatricula {
  constructor(data) {
    this.estado = data.estado ?? null;
    this.cidade = data.cidade ?? null;
    this.ies = data.ies ?? null;
    this.sigla = data.sigla ?? null;
    this.organizacao = data.organizacao ?? null;
    this.categoria_administrativa = data.categoria_administrativa ?? null;
    this.nome_do_curso = data.nome_do_curso ?? null;
    this.nome_detalhado_do_curso = data.nome_detalhado_do_curso ?? null;
    this.modalidade = data.modalidade ?? null;
    this.grau = data.grau ?? null;
    this.ano_2014 = data.ano_2014 ?? null;
    this.ano_2015 = data.ano_2015 ?? null;
    this.ano_2016 = data.ano_2016 ?? null;
    this.ano_2017 = data.ano_2017 ?? null;
    this.ano_2018 = data.ano_2018 ?? null;
    this.ano_2019 = data.ano_2019 ?? null;
    this.ano_2020 = data.ano_2020 ?? null;
    this.ano_2021 = data.ano_2021 ?? null;
    this.ano_2022 = data.ano_2022 ?? null;
  }
}

module.exports = CursoMatricula;