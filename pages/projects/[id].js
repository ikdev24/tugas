import { useState } from 'react';
import Link from 'next/link';
import { query } from '../../lib/db';

export async function getServerSideProps({ params }) {
  const [project] = await query('SELECT id, name FROM projects WHERE id=?', [params.id]);
  const tasks = await query('SELECT id, title, status FROM tasks WHERE project_id=? ORDER BY id DESC', [params.id]);
  return { props: { project, tasks } };
}

export default function Project({ project, tasks }) {
  const [title, setTitle] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project_id: project.id, title }),
    });
    window.location.reload();
  }

  return (
    <main className="container">
      <h1>{project.name}</h1>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.title} - {t.status}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task" required />
        <button type="submit">Add Task</button>
      </form>
      <p>
        <Link href="/">← Back</Link>
      </p>
    </main>
  );
}
