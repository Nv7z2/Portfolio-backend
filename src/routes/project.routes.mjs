import { Router } from 'express';
import db from '../db.js';
import arrayResponse from '../utils/arrayResponse.mjs';

const router = Router();

router.get('/projects', async (req, res) => {
  await db.read();
  const projects = arrayResponse(db.data);

  res.json(projects);
});

router.get('/project/:id', async (req, res) => {
  await db.read();
  console.log(req.params);
  const projects = arrayResponse(db.data);
  const data = projects.find(project => project.id === Number(req.params.id));

  res.json(data);
});

export default router;
