CREATE TABLE IF NOT EXISTS cursos_matriculas (
    id SERIAL PRIMARY KEY,
    estado TEXT,
    cidade TEXT,
    ies TEXT,
    sigla TEXT,
    organizacao TEXT,
    categoria_administrativa TEXT,
    nome_do_curso TEXT,
    nome_detalhado_do_curso TEXT,
    modalidade TEXT,
    grau TEXT,
    ano_2014 INTEGER,
    ano_2015 INTEGER,
    ano_2016 INTEGER,
    ano_2017 INTEGER,
    ano_2018 INTEGER,
    ano_2019 INTEGER,
    ano_2020 INTEGER,
    ano_2021 INTEGER,
    ano_2022 INTEGER
);

COPY cursos_matriculas(estado, cidade, ies, sigla, organizacao, categoria_administrativa, nome_do_curso, nome_detalhado_do_curso, modalidade, grau, ano_2014, ano_2015, ano_2016, ano_2017, ano_2018, ano_2019, ano_2020, ano_2021, ano_2022)
FROM '/docker-entrypoint-initdb.d/cursos_matriculas.csv'
DELIMITER ';'
CSV HEADER;