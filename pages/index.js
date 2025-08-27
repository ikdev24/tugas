import { useState } from 'react';
import Link from 'next/link';
import { query } from '../lib/db';
import { Button } from '../components/ui/button';

export async function getServerSideProps() {
  const projects = await query('SELECT id, name FROM projects ORDER BY id DESC');
  return { props: { projects } };
}

export default function Home({ projects }) {
  const [name, setName] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    window.location.reload();
  }

  return (
    <main className="mx-auto max-w-xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Projects</h1>
      <ul className="mb-4 list-disc pl-4">
        {projects.map((p) => (
          <li key={p.id} className="mb-1">
            <Link className="text-blue-600 underline" href={`/projects/${p.id}`}>
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 rounded border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New project name"
          required
        />
        <Button type="submit">Add Project</Button>
      </form>
    </main>
  );
}
