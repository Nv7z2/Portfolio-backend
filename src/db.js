import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

export const projectsDB = new Low(new JSONFile('data/projects.json'));
export const experiencesDB = new Low(new JSONFile('data/experiences.json'));
