import { Router } from 'express';
import { projectsDB } from '../db.js';
import arrayResponse from '../utils/arrayResponse.mjs';

const router = Router();

router.get('/projects', async (req, res) => {
  await projectsDB.read();
  const projects = arrayResponse(projectsDB.data);

  res.json(projects);
});

router.get('/project/:id', async (req, res) => {
  await projectsDB.read();
  const projects = arrayResponse(projectsDB.data);
  const data = projects.find(project => project.id === Number(req.params.id));

  res.json(data);
});

export default router;
