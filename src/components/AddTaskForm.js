// ─────────────────────────────────────────────
// AddTaskForm — the input + button at the top
// What: controlled form for typing a new task.
//       Only owns the text being typed right now;
//       the actual task list lives in TaskBoard.
// Type: Client Component (needs useState + events).
// Props: onAdd — callback(title) fired on submit.
// ─────────────────────────────────────────────
'use client';

import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  // Keeping `title` local because nobody else cares
  // what the user is halfway through typing. If I
  // lifted this up to TaskBoard, the whole board
  // would re-render on every keystroke. Waste.
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    // preventDefault stops the browser's default
    // form behavior (POST + full page reload),
    // which would nuke all of our React state.
    e.preventDefault();

    // Reject blanks. .trim() is important so
    // spaces like "   " don't slip through.
    const clean = title.trim();
    if (!clean) return;

    // Send the new title up to TaskBoard. It owns
    // the array, so only it can add to it.
    onAdd(clean);

    // Clear the input so it's ready for the next one.
    setTitle('');
  }

  return (
    // Using onSubmit on the <form> (not onClick on
    // the button) so Enter inside the input also
    // works — good for keyboard users.
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      {/* Controlled input: value is always whatever
          is in state. onChange keeps them in sync.
          Without onChange the input would look frozen
          because React would keep overwriting what
          the user types with the old state value. */}
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
      {/* type="submit" means Enter inside the input
          triggers the form's onSubmit too.
          cursor-pointer so the mouse shows it's clickable. */}
      <button
        type="submit"
        className="cursor-pointer bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600
                   text-neutral-950 font-medium rounded-lg px-5 py-3
                   transition-colors"
      >
        Add
      </button>
    </form>
  );
}