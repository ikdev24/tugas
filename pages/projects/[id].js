import { useState } from 'react';
import Link from 'next/link';
import { query } from '../../lib/db';
import { Button } from '../../components/ui/button';

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
    <main className="mx-auto max-w-xl p-4">
      <h1 className="mb-4 text-2xl font-bold">{project.name}</h1>
      <ul className="mb-4 list-disc pl-4">
        {tasks.map((t) => (
          <li key={t.id} className="mb-1">
            {t.title} - {t.status}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 rounded border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
          required
        />
        <Button type="submit">Add Task</Button>
      </form>
      <p className="mt-4">
        <Link className="text-blue-600 underline" href="/">
          ← Back
        </Link>
      </p>
    </main>
  );
}
