import os from 'os';
import { notionClient } from '../notion.mjs';

export const logApiCall = async ({ title, description }) => {
  if (os.hostname().includes('local')) return;

  await notionClient.pages.create({
    parent: {
      type: 'database_id',
      database_id: process.env.NOTION_LOGS_DB,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      Description: {
        rich_text: [
          {
            text: {
              content: description,
            },
          },
        ],
      },
    },
  });
};
