import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getDatabase(database) {
  return await notion.databases.query({
    database_id: database,
  });
}
