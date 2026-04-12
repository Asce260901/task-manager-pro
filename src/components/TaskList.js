// ─────────────────────────────────────────────
// TaskList — renders the array of task rows
// What: dumb component — just maps data to UI.
//       Doesn't know about filters, storage, or
//       sorting. Renders whatever list it's given.
// Type: Client Component (descendant of one).
// Props: tasks    — array of task objects
//        onToggle — callback(id), passed through
//        onDelete — callback(id), passed through
//        onEdit   — callback(id, updates), passed through
// ─────────────────────────────────────────────
'use client';

import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  // Empty state: show a friendly message with an icon
  // instead of an empty <ul>. Better UX than a blank
  // space that makes the user wonder if it broke.
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-400 dark:text-neutral-600">
        <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10 mb-2" fill="none"
             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2"/>
          <path d="M8 2v4M16 2v4M3 10h18"/>
        </svg>
        <p className="text-sm">Nothing here yet.</p>
        <p className="text-xs mt-1 opacity-75">Add a task above to get started.</p>
      </div>
    );
  }

  return (
    // <ul> is semantically correct for a list. No
    // dividers between cards anymore — each card now
    // has its own spacing and priority accent bar, so
    // dividers would fight with that.
    <ul className="space-y-1.5">
      {tasks.map((task) => (
        // key uses task.id (a stable UUID). Using the
        // array index instead would confuse React after
        // deletes/reorders and cause stale renders.
        <li key={task.id}>
          <TaskCard
            task={task}
            // Callbacks forwarded straight through.
            // TaskCard doesn't know who handles them —
            // it just calls what it was given.
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </li>
      ))}
    </ul>
  );
}