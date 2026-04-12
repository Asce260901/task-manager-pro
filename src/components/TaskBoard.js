// ─────────────────────────────────────────────
// TaskBoard — the brain of the app
// What: holds the task list and the current filter.
//       Hands data down to the smaller components
//       and gets events back up through callbacks.
// Type: Client Component (needs useState + useEffect).
// Props: none — it sits at the top of the tree.
// ─────────────────────────────────────────────
'use client';

import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import FilterBar   from './FilterBar';
import TaskList    from './TaskList';
import TaskStats   from './TaskStats';
import ThemeToggle from './ThemeToggle';

export default function TaskBoard() {
  // ── STATE ────────────────────────────────────
  // tasks has to live in state because the user
  // creates it (typing, clicking) and the UI needs
  // to re-render every time it changes. Nothing
  // else to derive it from.
  //
  // Passing a function to useState (the "lazy
  // initializer") means this code only runs on
  // the very first render. Reading localStorage
  // is slow-ish, no point doing it on every render.
  //
  // The typeof window check is here because Next.js
  // renders components on the server first, and
  // there's no `window` on the server. If we just
  // called localStorage directly it would crash
  // the build. On the server we return []; once
  // the page hydrates in the browser, the real
  // tasks come in.
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // filter is its own useState call because it
  // changes at different times than tasks — no
  // reason to tangle them together.
  const [filter, setFilter] = useState('all');

  // ── EFFECT: save to localStorage ─────────────
  // useEffect is how you sync React with something
  // outside React (localStorage here). The [tasks]
  // dependency means: only run again when tasks
  // actually changes. If I left the array empty
  // it would only save once, ever. If I left it
  // off, it would run every single render.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ── DERIVED VALUES (NOT in state) ────────────
  // These get recalculated every render from tasks.
  // I'm not storing them in state on purpose — if
  // I did, I'd have two sources of truth and they
  // could end up disagreeing. Rule I follow: if
  // I can compute it from state I already have,
  // don't make it its own state.
  const totalCount     = tasks.length;
  const completedCount = tasks.filter((t) => t.done).length;
  const activeCount    = totalCount - completedCount;

  // Same idea for the visible list — filter is just
  // a lens over tasks, so derive it fresh each time.
  const visible =
    filter === 'done'   ? tasks.filter((t) => t.done)
    : filter === 'active' ? tasks.filter((t) => !t.done)
    : tasks;

  // ── HANDLERS (go DOWN as callback props) ─────
  // These live here because TaskBoard owns tasks.
  // The children call them; only this component
  // is allowed to actually update the array.

  // Adding a task: I build a brand-new array with
  // the spread operator instead of tasks.push(),
  // because React checks by reference. If I mutate
  // the existing array, React thinks "same array,
  // nothing to do" and skips the re-render. Spread
  // gives me a new array, so React re-renders.
  function handleAdd(title) {
    setTasks([
      ...tasks,
      { id: crypto.randomUUID(), title, done: false },
    ]);
  }

  // Toggle done: .map() returns a new array. For
  // the matching task I spread it and flip done,
  // other tasks come out unchanged. Same immutability
  // reason — new array = React sees the change.
  function handleToggle(id) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  // Delete: .filter() keeps everything whose id
  // doesn't match. Again, new array, not a mutation.
  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  // Wipe all completed tasks in one shot so the
  // user sees a single update, not one per item.
  function handleClearDone() {
    setTasks(tasks.filter((t) => !t.done));
  }

  // ── RENDER ───────────────────────────────────
  // Centered column, capped width so it reads well
  // on a laptop but still fills a phone screen.
  // px-4 keeps the content off the edges on mobile.
  return (
    <div className="mx-auto w-full max-w-md px-4 py-10 sm:py-16">
      {/* Header row: title on the left, theme button
          on the right. justify-between pushes them apart. */}
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-light tracking-tight">Tasks</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-500">
            Keep it simple. Get it done.
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* onAdd is the callback — when the form submits,
          it calls this and we update state here. */}
      <AddTaskForm onAdd={handleAdd} />

      {/* FilterBar needs the current filter (so the
          active button can highlight) plus a setter
          to send clicks back up. */}
      <FilterBar filter={filter} onChange={setFilter} />

      {/* I pass `visible` (already filtered) so
          TaskList doesn't have to know about filters —
          it just renders whatever array it's given. */}
      <TaskList
        tasks={visible}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      {/* Stats + clear-completed button sit together
          because they share the same data. */}
      <TaskStats
        total={totalCount}
        active={activeCount}
        completed={completedCount}
        onClearDone={handleClearDone}
      />
    </div>
  );
}