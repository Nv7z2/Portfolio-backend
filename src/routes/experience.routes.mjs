import { Router } from 'express';
import { experiencesDB } from '../db.js';
import arrayResponse from '../utils/arrayResponse.mjs';

const router = Router();

router.get('/experiences', async (req, res) => {
  await experiencesDB.read();
  console.log(experiencesDB.data)
  const experiences = arrayResponse(experiencesDB.data);

  res.json(experiences);
});

router.get('/experience/:id', async (req, res) => {
  await experiencesDB.read();
  const experiences = arrayResponse(experiencesDB.data);
  const data = experiences.find(exp => exp.id === Number(req.params.id));

  res.json(data);
});

export default router;
