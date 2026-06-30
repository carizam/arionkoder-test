import { useMemo, useState } from 'react';

const initialTasks = [
  { id: 1, title: 'Write a small React app', completed: true },
  { id: 2, title: 'Automate core user flows', completed: false },
];

const filters = ['all', 'active', 'completed'];

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.completed ? 'completed' : ''}>{task.title}</span>
      </label>
      <button type="button" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [draft, setDraft] = useState('');
  const [filter, setFilter] = useState('all');

  const visibleTasks = useMemo(() => {
    if (filter === 'active') {
      return tasks.filter((task) => !task.completed);
    }

    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  }, [filter, tasks]);

  const remainingCount = tasks.filter((task) => !task.completed).length;

  function addTask(event) {
    event.preventDefault();
    const title = draft.trim();

    if (!title) {
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), title, completed: false },
    ]);
    setDraft('');
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  return (
    <main className="app-shell">
      <section className="todo-panel" aria-labelledby="app-title">
        <div className="intro">
          <p>Minimal Automation Exercise</p>
          <h1 id="app-title">Team Tasks</h1>
        </div>

        <form className="task-form" onSubmit={addTask}>
          <label htmlFor="task-title">New task</label>
          <div>
            <input
              id="task-title"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Add a task"
            />
            <button type="submit">Add</button>
          </div>
        </form>

        <div className="toolbar" aria-label="Task filters">
          {filters.map((option) => (
            <button
              key={option}
              type="button"
              className={filter === option ? 'selected' : ''}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <ul className="task-list" aria-label="Tasks">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>

        {visibleTasks.length === 0 ? (
          <p className="empty-state">No tasks match this filter.</p>
        ) : null}

        <p className="summary" aria-live="polite">
          {remainingCount} active {remainingCount === 1 ? 'task' : 'tasks'} left
        </p>
      </section>
    </main>
  );
}
