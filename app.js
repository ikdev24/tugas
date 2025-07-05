const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Homepage - list projects
app.get('/', async (req, res) => {
  try {
    const rows = await db.query('SELECT id, name FROM projects ORDER BY id DESC');
    res.render('index', { projects: rows });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Show tasks in a project
app.get('/projects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const projectRows = await db.query('SELECT id, name FROM projects WHERE id=?', [projectId]);
    const taskRows = await db.query('SELECT * FROM tasks WHERE project_id=? ORDER BY id DESC', [projectId]);
    if (projectRows.length === 0) {
      return res.status(404).send('Project not found');
    }
    res.render('project', { project: projectRows[0], tasks: taskRows });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Add project
app.post('/projects', async (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.redirect('/');
    }
    await db.query('INSERT INTO projects(name) VALUES(?)', [name]);
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Add task to a project
app.post('/projects/:id/tasks', async (req, res) => {
  try {
    const projectId = req.params.id;
    const title = req.body.title;
    if (!title) {
      return res.redirect('/projects/' + projectId);
    }
    await db.query('INSERT INTO tasks(project_id, title, status) VALUES(?, ?, ?)', [projectId, title, 'todo']);
    res.redirect('/projects/' + projectId);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
