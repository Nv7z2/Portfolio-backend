import { Router } from 'express';
import { getDatabase } from '../notion.mjs';
import { formatText } from '../utils/formatData.mjs';

const router = Router();

router.get('/projects', async (req, res) => {
  const db = await getDatabase(process.env.NOTION_PROJECTS_DB);

  const results = db.results.map(page => {
    const {
      Link,
      Name,
      Description: { rich_text: Description },
      Tags: { multi_select: tags },
    } = page.properties;

    return {
      id: page.id,
      url: Link.url,
      name: formatText(Name.title),
      description: formatText(Description),
      tags: tags.map(tag => tag.name),
    };
  });

  res.status(200).json(results);
});

export default router;
