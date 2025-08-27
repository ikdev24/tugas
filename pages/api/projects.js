import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.body;
    await query('INSERT INTO projects(name) VALUES(?)', [name]);
    res.status(201).json({ message: 'created' });
  } else {
    res.status(405).end();
  }
}
