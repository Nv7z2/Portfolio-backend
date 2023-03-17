import { Router } from 'express';
import { logApiCall } from '../middlewares/logCalls.mjs';
import { getDatabase } from '../notion.mjs';
import { formatDate, formatText } from '../utils/formatData.mjs';

const router = Router();

router.get('/experiences', async (req, res) => {
  const db = await getDatabase({
    database: process.env.NOTION_EXPERIENCE_DB,
    sort: [
      {
        property: 'Start_date',
        direction: 'descending',
      },
    ],
  });

  const results = db.results.map(page => {
    const { Company, Position, Company_Link, Start_date, End_date } =
      page.properties;

    return {
      id: page.id,
      company: formatText(Company.title),
      position: formatText(Position.rich_text),
      link: Company_Link.url,
      startDate: formatDate(Start_date.date.start),
      endDate: End_date.date ? formatDate(End_date.date.start) : 'Present',
    };
  });

  res.status(200).json(results);
  logApiCall({ title: 'GET /experiences', description: 'Get all experiences' });
});

export default router;
