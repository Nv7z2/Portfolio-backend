import { Router } from 'express';
import { logApiCall } from '../middlewares/logCalls.mjs';
import { getDatabase } from '../notion.mjs';
import { formatText } from '../utils/formatData.mjs';

const router = Router();

router.get('/translations', async (req, res) => {
  const db = await getDatabase({
    database: process.env.NOTION_TRANSLATIONS_DB,
    sort: [
      {
        property: 'Last edit',
        direction: 'descending',
      },
    ],
  });

  const results = db.results.map(page => {
    const {
      Project,
      URL,
      Description: { rich_text: Description },
      Tags: { multi_select: tags },
    } = page.properties;

    return {
      id: page.id,
      title: formatText(Project.title),
      url: URL.url,
      description: formatText(Description),
      tags: tags.map(tag => tag.name),
    };
  });

  res.status(200).json(results);
  logApiCall({
    title: 'GET /translations',
    description: 'Get all translations',
  });
});

export default router;
