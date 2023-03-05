import { Router } from 'express';
import { logApiCall } from '../middlewares/logCalls.mjs';
import { getDatabase } from '../notion.mjs';
import { formatText } from '../utils/formatData.mjs';

const router = Router();

router.get('/projects', async (req, res) => {
  const db = await getDatabase({ database: process.env.NOTION_PROJECTS_DB });

  const results = db.results.map(page => {
    const {
      Link,
      Name,
      Description: { rich_text: Description },
      Tags: { multi_select: tags },
    } = page.properties;

    return {
      id: page.id,
      link: Link.url,
      title: formatText(Name.title),
      description: formatText(Description),
      tags: tags.map(tag => tag.name),
    };
  });

  res.status(200).json(results);
  logApiCall({ title: 'GET /projects', description: 'Get all projects' });
});

export default router;
