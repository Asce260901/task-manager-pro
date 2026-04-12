// ─────────────────────────────────────────────
// TaskStats — the counts + "Clear completed"
// What: shows total / active / completed and a
//       button to nuke all completed tasks. Every
//       number is a prop — this component never
//       does its own math, so the counts can't
//       drift out of sync with the real list.
// Type: Client Component (needs onClick).
// Props: total       — number of tasks
//        active      — not yet done
//        completed   — done
//        onClearDone — callback when "Clear" is tapped
// ─────────────────────────────────────────────
'use client';

export default function TaskStats({ total, active, completed, onClearDone }) {
  return (
    <div className="mt-6 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-500">

      {/* These update automatically because they come
          in as fresh props every time TaskBoard
          re-renders. They're derived values up there,
          not their own state — that's the whole point. */}
      <div className="flex gap-3">
        <span>{total} total</span>
        <span>·</span>
        <span>{active} active</span>
        <span>·</span>
        <span>{completed} done</span>
      </div>

      {/* Conditional render: only show the button when
          there's actually something to clear. No point
          showing a dead button the user can't use.
          cursor-pointer so the mouse shows it's clickable. */}
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