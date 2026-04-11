const express = require('express');
const cursoMatriculaRepository = require('../repositories/CursoMatriculaRepository');

const router = express.Router();

router.get('/enrollments-by-year', async (req, res) => {
  try {
    const modalidade = req.query.modalidade;
    const data = await cursoMatriculaRepository.getEnrollmentsByYear(modalidade);
    res.json(data);
  } catch (err) {
    console.error('GET /enrollments-by-year', err);
    res.status(500).json({ error: 'Failed to load enrollments' });
  }
});

router.get('/course-ranking', async (req, res) => {
  try {
    const modalidade = req.query.modalidade;
    const data = await cursoMatriculaRepository.getCourseRanking(modalidade);
    res.json(data);
  } catch (err) {
    console.error('GET /course-ranking', err);
    res.status(500).json({ error: 'Failed to load course ranking' });
  }
});

router.get('/ies-ranking', async (req, res) => {
  try {
    const tipo = req.query.tipo;
    const modalidade = req.query.modalidade;
    const data = await cursoMatriculaRepository.getIESRanking({ tipo, modalidade });
    res.json(data);
  } catch (err) {
    console.error('GET /ies-ranking', err);
    res.status(500).json({ error: 'Failed to load IES ranking' });
  }
});

module.exports = router;
