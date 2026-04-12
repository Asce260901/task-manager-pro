// ─────────────────────────────────────────────
// TaskCard — one row in the list
// What: shows the task's text, a toggle circle,
//       a priority accent bar, an optional due
//       date, and a delete ×. Clicking the text
//       switches it to an editable input.
//       Owns one piece of local state: whether
//       we're currently editing. Everything else
//       comes in as props.
// Type: Client Component (needs state + events).
// Props: task     — { id, title, done, priority, dueDate }
//        onToggle — callback(id) for the circle
//        onDelete — callback(id) for the ×
//        onEdit   — callback(id, updates) for edits
// ─────────────────────────────────────────────
'use client';

import { useState } from 'react';

// Map of priority → hex color for the left-edge bar.
// Declared outside the component so the object isn't
// rebuilt on every render. Using hex instead of Tailwind
// classes because we set the color via inline style (the
// JIT compiler can't see classes built from variables).
const PRIORITY_COLOR = {
  high: '#ef4444', // red-500
  med:  '#f59e0b', // amber-500
  low:  '#10b981', // emerald-500
};

// Format an ISO date (YYYY-MM-DD) into something
// readable. Returns a pair: the display string and
// a boolean indicating whether it's overdue.
function describeDueDate(iso) {
  if (!iso) return null;
  // Build dates at local midnight so comparisons
  // aren't thrown off by time-of-day or timezone.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(iso + 'T00:00:00');
  const diffDays = Math.round((due - today) / 86400000);

  let label;
  if (diffDays === 0)      label = 'Today';
  else if (diffDays === 1) label = 'Tomorrow';
  else if (diffDays === -1) label = 'Yesterday';
  else if (diffDays < 0)   label = `${-diffDays}d overdue`;
  else if (diffDays < 7)   label = `In ${diffDays}d`;
  else                     label = due.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  return { label, overdue: diffDays < 0 };
}

export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const { id, title, done, priority, dueDate } = task;

  // Local state: are we editing right now, and what's
  // the draft text. Both are private to this row —
  // no other card needs to know, no reason to lift up.
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft]         = useState(title);

  // Conditional styling for the title: strike-through
  // + dim when the task is done. Ternary picks the
  // right class string.
  const titleClasses = done
    ? 'line-through text-neutral-400 dark:text-neutral-600'
    : 'text-neutral-900 dark:text-neutral-100';

  const due = describeDueDate(dueDate);

  // Save the edit: trim, reject blanks, call the
  // parent's onEdit. Close the editor either way.
  function saveEdit() {
    const clean = draft.trim();
    if (clean && clean !== title) {
      onEdit(id, { title: clean });
    } else {
      // No real change — reset draft to the original.
      setDraft(title);
    }
    setIsEditing(false);
  }

  // Keyboard shortcuts while editing: Enter saves,
  // Escape cancels without saving.
  function handleKey(e) {
    if (e.key === 'Enter')  saveEdit();
    if (e.key === 'Escape') { setDraft(title); setIsEditing(false); }
  }

  return (
    // Wrapper: priority color strip on the left edge
    // via border-l-4 (inline style sets the actual color).
    // animate-fade-in-up is the slide-in defined in
    // globals.css. `group` lets the delete button fade
    // in on hover via group-hover.
    <div
      className="group flex items-center gap-3 pl-3 pr-2 py-3 rounded-lg border-l-4
                 bg-neutral-50 dark:bg-neutral-900/60
                 hover:bg-neutral-100 dark:hover:bg-neutral-900
                 transition-colors animate-fade-in-up"
      style={{ borderLeftColor: PRIORITY_COLOR[priority] || PRIORITY_COLOR.med }}
    >
      {/* Toggle "checkbox". Using a <button> instead
          of a native checkbox so the styling stays
          consistent in both themes. aria-pressed
          communicates state to screen readers. */}
      <button
        aria-pressed={done}
        aria-label={done ? 'Mark as active' : 'Mark as done'}
        onClick={() => onToggle(id)}
        className={`cursor-pointer h-6 w-6 shrink-0 rounded-full border transition-colors
          ${done
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-neutral-400 hover:border-neutral-600 dark:border-neutral-600 dark:hover:border-neutral-400'}`}
      >
        {/* Conditional render: checkmark only when done. */}
        {done && (
          <svg viewBox="0 0 20 20" className="h-4 w-4 mx-auto text-white" fill="currentColor">
            <path d="M7.5 13.5l-3-3 1.4-1.4 1.6 1.6 4.6-4.6 1.4 1.4z"/>
          </svg>
        )}
      </button>

      {/* Main content column: title + optional due date.
          min-w-0 lets flexbox shrink this column so long
          titles can wrap instead of pushing the delete
          button off-screen. */}
      <div className="flex-1 min-w-0">
        {/* Conditional render: input while editing,
            static text otherwise. */}
        {isEditing ? (
          // autoFocus puts the cursor in immediately
          // when the user clicks into edit mode.
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKey}
            className="w-full bg-transparent outline-none text-neutral-900 dark:text-neutral-100
                       border-b border-emerald-500/60 pb-0.5"
          />
        ) : (
          // Whole column is clickable to edit — gives
          // a big tap target without needing a dedicated
          // edit button. Disabled once the task is done
          // (editing a completed task is usually pointless).
          <button
            onClick={() => !done && setIsEditing(true)}
            className={`block text-left w-full break-words ${titleClasses} ${done ? '' : 'cursor-text hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors'}`}
          >
            {title}
          </button>
        )}

        {/* Conditional render: due date only when set.
            Overdue gets red, near-future gets default. */}
        {due && !isEditing && (
          <div className={`mt-0.5 text-xs ${
            due.overdue && !done
              ? 'text-red-500 dark:text-red-400 font-medium'
              : 'text-neutral-500 dark:text-neutral-500'
          }`}>
            {due.label}
          </div>
        )}
      </div>

      {/* Delete button. opacity-0 group-hover:opacity-100
          makes it only appear when hovering the row on
          desktop — less visual noise. On touch devices
          hover is effectively "always" so it stays visible. */}
      <button
        aria-label="Delete task"
        onClick={() => onDelete(id)}
        className="cursor-pointer text-neutral-400 hover:text-red-500
                   dark:text-neutral-600 dark:hover:text-red-400
                   transition-colors text-xl leading-none shrink-0 px-1
                   opacity-60 group-hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}