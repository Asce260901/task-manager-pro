// ─────────────────────────────────────────────
// TaskBoard — the brain of the app
// What: holds the task list and the current filter.
//       Hands data down to the smaller components
//       and gets events back up through callbacks.
// Type: Client Component (needs useState + useEffect).
// Props: none — it sits at the top of the tree.
//
// Task shape:
//   { id, title, done, priority, dueDate, createdAt }
//   priority: 'high' | 'med' | 'low'
//   dueDate:  ISO string 'YYYY-MM-DD' or null
// ─────────────────────────────────────────────
'use client';

import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import FilterBar   from './FilterBar';
import TaskList    from './TaskList';
import TaskStats   from './TaskStats';
import ThemeToggle from './ThemeToggle';

// Priority ranking used when sorting. Declared
// outside the component so it isn't rebuilt every
// render. Lower number = higher priority.
const PRIORITY_RANK = { high: 0, med: 1, low: 2 };

export default function TaskBoard() {
  // ── STATE ────────────────────────────────────
  // tasks is in state because the user creates it
  // and the UI must re-render on every change.
  // Nothing else to derive it from.
  //
  // The lazy initializer (function form of useState)
  // runs only on the first render — no point reading
  // localStorage on every render.
  //
  // The typeof window check is because Next.js first
  // renders on the server where there is no `window`.
  // Touching localStorage there would crash the build.
  // On the server we return []; on the client the real
  // tasks come in once we hydrate.
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('tasks');
    if (!saved) return [];
    // Parse + backfill any fields that older saved
    // tasks might not have (priority, dueDate).
    // Stops old data from breaking the new UI.
    try {
      return JSON.parse(saved).map((t) => ({
        priority: 'med',
        dueDate: null,
        createdAt: Date.now(),
        ...t,
      }));
    } catch {
      return [];
    }
  });

  // filter is its own useState call — it changes at
  // different times than tasks, no reason to couple them.
  const [filter, setFilter] = useState('all');

  // ── EFFECT: save to localStorage ─────────────
  // useEffect is for syncing React state with an
  // external system (localStorage here). [tasks]
  // dependency means: only re-run when tasks changes.
  // Empty array would save once ever; missing array
  // would save on every single render.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ── DERIVED VALUES (NOT in state) ────────────
  // Recomputed every render from tasks. Not stored
  // in state on purpose — if I did, I'd have two
  // sources of truth that could disagree. Rule:
  // if I can calculate it from existing state, don't
  // make it its own state.
  const totalCount     = tasks.length;
  const completedCount = tasks.filter((t) => t.done).length;
  const activeCount    = totalCount - completedCount;

  // Filter by tab, then sort: unfinished first, then
  // by priority (high → low), then by due date (soonest
  // first, no-date last). Sort happens on a copy with
  // [...] because .sort() mutates in place — we never
  // want to mutate React state.
  const visible = [...tasks]
    .filter((t) => {
      if (filter === 'done')   return t.done;
      if (filter === 'active') return !t.done;
      return true;
    })
    .sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      const p = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
      if (p !== 0) return p;
      if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      return 0;
    });

  // ── HANDLERS (passed DOWN as callbacks) ──────
  // These live here because TaskBoard owns tasks.
  // Children call them; only this component actually
  // updates the array.

  // Add: build a NEW array with spread instead of
  // .push(). React compares by reference, so mutating
  // would skip the re-render. Spread gives a fresh
  // array → re-render happens.
  function handleAdd({ title, priority, dueDate }) {
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title,
        done: false,
        priority: priority || 'med',
        dueDate: dueDate || null,
        createdAt: Date.now(),
      },
    ]);
  }

  // Toggle done: .map() returns a new array. For the
  // matching task I spread it and flip done; others
  // come out unchanged. Immutability again.
  function handleToggle(id) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  // Edit: same .map() pattern, but merge in the new
  // fields. `updates` is a partial object like
  // { title: 'new text' } or { priority: 'high' }.
  function handleEdit(id, updates) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }

  // Delete: .filter() keeps everything whose id
  // doesn't match. New array, not a mutation.
  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  // Bulk-remove completed in a single setState so the
  // user sees one smooth update, not one per item.
  function handleClearDone() {
    setTasks(tasks.filter((t) => !t.done));
  }

  // ── RENDER ───────────────────────────────────
  // Centered column, capped width so it reads well
  // on a laptop but still fills a phone screen.
  return (
    <div className="mx-auto w-full max-w-md px-4 py-10 sm:py-16">
      {/* Header: title on the left, theme toggle on
          the right. justify-between pushes them apart. */}
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-light tracking-tight">Tasks</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Keep it simple. Get it done.
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* onAdd receives the whole new-task object
          (title + priority + dueDate) so the form
          can bundle everything in one call. */}
      <AddTaskForm onAdd={handleAdd} />

      {/* Filter bar gets the current filter + a setter. */}
      <FilterBar filter={filter} onChange={setFilter} />

      {/* TaskList just renders what it's handed — the
          sorting / filtering all happened above. */}
      <TaskList
        tasks={visible}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <TaskStats
        total={totalCount}
        active={activeCount}
        completed={completedCount}
        onClearDone={handleClearDone}
      />
    </div>
  );
}