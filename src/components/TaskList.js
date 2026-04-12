// ─────────────────────────────────────────────
// TaskList — renders the array of task rows
// What: dumb component, just maps data to UI.
//       Doesn't know about filters, storage, or
//       anything else — it renders whatever list
//       it's given.
// Type: Client Component (it's a descendant of
//       one, so it shares that boundary).
// Props: tasks    — array of { id, title, done }
//        onToggle — callback(id), passed through
//        onDelete — callback(id), passed through
// ─────────────────────────────────────────────
'use client';

import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onDelete }) {
  // Empty state: if there's nothing to show, show
  // a short message instead of rendering an empty
  // <ul>. Stops the user from wondering if the app
  // broke.
  if (tasks.length === 0) {
    return (
      <p className="text-center text-neutral-600 text-sm py-8">
        Nothing here yet.
      </p>
    );
  }

  return (
    // <ul> is the right element for a list semantically.
    // divide-y puts a thin line between rows without
    // needing a border on each card — fits the
    // minimal look.
    <ul className="divide-y divide-neutral-900 bg-neutral-900/40 rounded-lg overflow-hidden">
      {tasks.map((task) => (
        // key lets React keep track of each row across
        // renders. I'm using task.id (a UUID) because
        // it's stable — if I used the array index instead,
        // React would get confused after a delete or
        // reorder and end up showing stale stuff.
        <li key={task.id}>
          <TaskCard
            id={task.id}
            title={task.title}
            done={task.done}
            // Callbacks get forwarded straight through.
            // TaskCard has no idea who actually handles
            // the click — it just calls the function
            // it was handed.
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}