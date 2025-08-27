import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { project_id, title } = req.body;
    await query('INSERT INTO tasks(project_id, title, status) VALUES(?, ?, ?)', [project_id, title, 'todo']);
    res.status(201).json({ message: 'created' });
  } else {
    res.status(405).end();
  }
}
