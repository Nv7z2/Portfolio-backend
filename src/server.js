import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { logApiCall } from './middlewares/logCalls.mjs';
import './notion.mjs';
import experiencesRoutes from './routes/experience.routes.mjs';
import projectsRoutes from './routes/project.routes.mjs';
import translationsRoutes from './routes/translations.routes.mjs';

export const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(projectsRoutes);
app.use(experiencesRoutes);
app.use(translationsRoutes);

app.listen(4000, () => {
  console.log('Back-end is running');
  logApiCall({ title: 'Server started', description: 'Server started' });
});
