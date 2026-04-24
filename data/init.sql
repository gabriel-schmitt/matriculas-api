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

CREATE TABLE IF NOT EXISTS ies (
    id SERIAL PRIMARY KEY,
    estado TEXT,
    cidade TEXT,
    nome TEXT,
    sigla TEXT,
    organizacao TEXT,
    categoria_administrativa TEXT
);

CREATE TABLE IF NOT EXISTS curso (
    id SERIAL PRIMARY KEY,
    nome TEXT,
    nome_detalhado TEXT,
    modalidade TEXT,
    grau TEXT
);

CREATE TABLE IF NOT EXISTS curso_ies (
    id SERIAL PRIMARY KEY,
    curso_id INTEGER REFERENCES curso(id),
    ies_id INTEGER REFERENCES ies(id)
);

CREATE TABLE IF NOT EXISTS matricula (
    id SERIAL PRIMARY KEY,
    curso_ies_id INTEGER REFERENCES curso_ies(id),
    ano INTEGER,
    quantidade INTEGER
);

INSERT INTO ies (estado, cidade, nome, sigla, organizacao, categoria_administrativa)
SELECT DISTINCT estado, cidade, ies, sigla, organizacao, categoria_administrativa
FROM cursos_matriculas;

INSERT INTO curso (nome, nome_detalhado, modalidade, grau)
SELECT DISTINCT nome_do_curso, nome_detalhado_do_curso, modalidade, grau
FROM cursos_matriculas;

INSERT INTO curso_ies (curso_id, ies_id)
SELECT DISTINCT c.id, i.id
FROM cursos_matriculas cm
JOIN curso c ON cm.nome_do_curso = c.nome AND cm.nome_detalhado_do_curso = c.nome_detalhado AND cm.modalidade = c.modalidade AND cm.grau = c.grau
JOIN ies i ON cm.ies = i.nome AND cm.sigla = i.sigla AND cm.organizacao = i.organizacao AND cm.categoria_administrativa = i.categoria_administrativa AND cm.estado = i.estado AND cm.cidade = i.cidade;

INSERT INTO matricula (curso_ies_id, ano, quantidade)
SELECT 
    ci.id,
    anos.ano, 
    anos.quantidade
FROM cursos_matriculas cm
JOIN curso c ON cm.nome_do_curso = c.nome AND cm.nome_detalhado_do_curso = c.nome_detalhado AND cm.modalidade = c.modalidade AND cm.grau = c.grau
JOIN ies i ON cm.ies = i.nome AND cm.sigla = i.sigla AND cm.organizacao = i.organizacao AND cm.categoria_administrativa = i.categoria_administrativa AND cm.estado = i.estado AND cm.cidade = i.cidade
JOIN curso_ies ci ON ci.curso_id = c.id AND ci.ies_id = i.id
CROSS JOIN LATERAL (
    VALUES 
        (2014, cm.ano_2014),
        (2015, cm.ano_2015),
        (2016, cm.ano_2016),
        (2017, cm.ano_2017),
        (2018, cm.ano_2018),
        (2019, cm.ano_2019),
        (2020, cm.ano_2020),
        (2021, cm.ano_2021),
        (2022, cm.ano_2022)
) AS anos(ano, quantidade)
WHERE anos.quantidade IS NOT NULL;

DROP TABLE cursos_matriculas;