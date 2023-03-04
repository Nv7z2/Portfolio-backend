import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const db = new Low(new JSONFile('data/projects.json'));

export default db;
