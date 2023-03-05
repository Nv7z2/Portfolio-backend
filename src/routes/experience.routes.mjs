import { Router } from 'express';
import { getDatabase } from '../notion.mjs';
import { formatDate, formatText } from '../utils/formatData.mjs';

const router = Router();

router.get('/experiences', async (req, res) => {
  const db = await getDatabase(process.env.NOTION_EXPERIENCE_DB);

  const results = db.results.map(page => {
    const { Company, Position, Company_Link, Start_date, End_date } =
      page.properties;

    return {
      id: page.id,
      company: formatText(Company.title),
      position: formatText(Position.rich_text),
      company_link: Company_Link.url,
      start_date: formatDate(Start_date.date.start),
      end_date: formatDate(End_date.date.start),
    };
  });

  res.status(200).json(results);
});

export default router;