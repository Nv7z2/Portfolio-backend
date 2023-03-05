import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getDatabase({ database, sort = null }) {
  const queryObject = {
    database_id: database,
  };

  if (!!sort) queryObject.sorts = sort;

  return await notion.databases.query(queryObject);
}

export const notionClient = notion;
