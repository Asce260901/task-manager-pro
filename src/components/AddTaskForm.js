// ─────────────────────────────────────────────
// AddTaskForm — the input row(s) at the top
// What: controlled form for title + priority +
//       optional due date. Owns only what the user
//       is currently entering; the task list lives
//       in TaskBoard.
// Type: Client Component (needs useState + events).
// Props: onAdd — callback({ title, priority, dueDate })
// ─────────────────────────────────────────────
'use client';

import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  // Three pieces of local state for the three inputs.
  // Keeping them local because nobody else needs to
  // know what the user is halfway through typing —
  // lifting any of this up would cause the whole
  // board to re-render on every keystroke.
  const [title, setTitle]       = useState('');
  const [priority, setPriority] = useState('med');
  const [dueDate, setDueDate]   = useState('');

  function handleSubmit(e) {
    // preventDefault stops the browser's default form
    // behavior (POST + full page reload) which would
    // nuke all our React state.
    e.preventDefault();

    // Reject blanks. .trim() so pure whitespace
    // doesn't slip through as valid.
    const clean = title.trim();
    if (!clean) return;

    // Send the whole new task up to TaskBoard — it
    // owns the list, so only it can add to it.
    onAdd({ title: clean, priority, dueDate: dueDate || null });

    // Reset everything ready for the next task.
    // Priority goes back to "med" (most common default),
    // due date clears out.
    setTitle('');
    setPriority('med');
    setDueDate('');
  }

  return (
    // onSubmit on the <form> handles both the button
    // click AND Enter inside the input — better for
    // keyboard users.
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      {/* Row 1: title + Add button */}
      <div className="flex gap-2">
        {/* Controlled input — value always mirrors state,
            onChange keeps them in sync. Without onChange
            the input would appear frozen. */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
          className="flex-1 rounded-lg px-4 py-3 outline-none
                     bg-neutral-100 text-neutral-900 placeholder:text-neutral-400
                     dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-600
                     focus:ring-1 focus:ring-emerald-500/60"
        />
        {/* type="submit" means Enter also fires this. */}
        <button
          type="submit"
          className="cursor-pointer bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600
                     text-neutral-950 font-medium rounded-lg px-5 py-3
                     transition-colors"
        >
          Add
        </button>
      </div>

      {/* Row 2: priority + due date. Small, secondary
          controls — smaller text, lighter colors, so
          the title field stays the main focus. */}
      <div className="flex gap-2">
        {/* Priority dropdown. Controlled select — same
            pattern as the text input, value mirrors state. */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Priority"
          className="cursor-pointer flex-1 rounded-lg px-3 py-2 text-sm outline-none
                     bg-neutral-100 text-neutral-700
                     dark:bg-neutral-900 dark:text-neutral-300
                     focus:ring-1 focus:ring-emerald-500/60"
        >
          <option value="high">🔴 High priority</option>
          <option value="med">🟡 Medium priority</option>
          <option value="low">🟢 Low priority</option>
        </select>

        {/* Native date input — simple, works on mobile,
            free calendar picker. Empty string means no
            due date, which we convert to null on submit. */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          aria-label="Due date (optional)"
          className="cursor-pointer flex-1 rounded-lg px-3 py-2 text-sm outline-none
                     bg-neutral-100 text-neutral-700
                     dark:bg-neutral-900 dark:text-neutral-300
                     focus:ring-1 focus:ring-emerald-500/60"
        />
      </div>
    </form>
  );
}