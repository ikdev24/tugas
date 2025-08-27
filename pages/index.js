import { useState } from 'react';
import Link from 'next/link';
import { query } from '../lib/db';

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
    <main className="container">
      <h1>Projects</h1>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <Link href={`/projects/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New project name" required />
        <button type="submit">Add Project</button>
      </form>
    </main>
  );
}
