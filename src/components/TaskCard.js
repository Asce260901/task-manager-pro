// ─────────────────────────────────────────────
// TaskCard — one row in the list
// What: shows a task's text, a toggle circle,
//       and a delete X. Owns no state; everything
//       comes in as props and goes out via callbacks.
// Type: Client Component (needs onClick).
// Props: id       — the task's UUID
//        title    — the text
//        done     — boolean, true = completed
//        onToggle — callback(id) when the circle is tapped
//        onDelete — callback(id) when the × is tapped
// ─────────────────────────────────────────────
'use client';

export default function TaskCard({ id, title, done, onToggle, onDelete }) {
  // Conditional styling: strike-through + dim when
  // the task is done, so it's obvious at a glance.
  // Just a ternary picking between two class strings.
  const titleClasses = done
    ? 'line-through text-neutral-600'
    : 'text-neutral-100';

  return (
    // py-4 gives a bigger tap area — important on
    // mobile where thumbs need ~44px to hit reliably.
    <div className="flex items-center gap-3 px-4 py-4">

      {/* Toggle "checkbox". I'm using a button instead
          of a real <input type=checkbox> so I can style
          it freely for the dark theme. aria-pressed
          tells screen readers what state it's in. */}
      <button
        aria-pressed={done}
        aria-label={done ? 'Mark as active' : 'Mark as done'}
        onClick={() => onToggle(id)}
        className={`h-6 w-6 shrink-0 rounded-full border transition-colors
          ${done
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-neutral-600 hover:border-neutral-400'}`}
      >
        {/* Conditional render: the checkmark only
            shows when done is true. */}
        {done && (
          <svg viewBox="0 0 20 20" className="h-4 w-4 mx-auto text-neutral-950" fill="currentColor">
            <path d="M7.5 13.5l-3-3 1.4-1.4 1.6 1.6 4.6-4.6 1.4 1.4z"/>
          </svg>
        )}
      </button>

      {/* Title. flex-1 lets it take all remaining
          space so the delete button stays on the
          right. break-words prevents one long URL
          from blowing out the layout. */}
      <span className={`flex-1 break-words ${titleClasses}`}>
        {title}
      </span>

      {/* Delete. Again, I'm just calling onDelete —
          TaskCard doesn't need to know what actually
          happens, only how to ask. */}
      <button
        aria-label="Delete task"
        onClick={() => onDelete(id)}
        className="text-neutral-600 hover:text-red-400 transition-colors
                   text-xl leading-none shrink-0 px-1"
      >
        ×
      </button>
    </div>
  );
}