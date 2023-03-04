import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import experiencesRoutes from './routes/experience.routes.mjs';
import projectsRoutes from './routes/project.routes.mjs';

export const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(projectsRoutes);
app.use(experiencesRoutes);

app.listen(4000, () => {
  console.log(`Running a server at http://localhost:${4000}`);
});
