// ─────────────────────────────────────────────
// TaskStats — the counts + "Clear completed"
// What: shows total / active / completed and a
//       button to wipe all completed tasks. Every
//       number is a prop — this component never
//       does its own math, so counts can't drift
//       out of sync with the real list.
// Type: Client Component (needs onClick).
// Props: total       — total tasks
//        active      — not yet done
//        completed   — done
//        onClearDone — callback for the clear button
// ─────────────────────────────────────────────
'use client';

export default function TaskStats({ total, active, completed, onClearDone }) {
  return (
    <div className="mt-6 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-500">

      {/* Live counts. They update automatically because
          they're passed as fresh props every time
          TaskBoard re-renders. Derived values, not state. */}
      <div className="flex gap-3">
        <span>{total} total</span>
        <span>·</span>
        <span>{active} active</span>
        <span>·</span>
        <span>{completed} done</span>
      </div>

      {/* Conditional render: only show the button when
          there's actually something to clear. No point
          showing a dead button the user can't use. */}
      {completed > 0 && (
        <button
          onClick={onClearDone}
          className="cursor-pointer text-neutral-600 hover:text-red-500
                     dark:text-neutral-400 dark:hover:text-red-400 transition-colors"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}