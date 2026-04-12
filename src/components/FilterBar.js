// ─────────────────────────────────────────────
// FilterBar — the All / Active / Done tabs
// What: three buttons that pick which tasks show.
//       Doesn't own any state itself — the current
//       filter lives up in TaskBoard and gets
//       passed in.
// Type: Client Component (needs onClick).
// Props: filter   — which tab is active right now
//        onChange — callback(newFilter) on click
// ─────────────────────────────────────────────
'use client';

// Declared outside the component so this array
// isn't rebuilt on every render. Tiny thing, but
// also makes the options easy to eyeball.
const OPTIONS = [
  { key: 'all',    label: 'All'    },
  { key: 'active', label: 'Active' },
  { key: 'done',   label: 'Done'   },
];

export default function FilterBar({ filter, onChange }) {
  return (
    <div
      // role="tablist" tells screen readers these
      // buttons belong together as a group.
      role="tablist"
      className="flex gap-1 mb-4 p-1 rounded-lg bg-neutral-100 dark:bg-neutral-900"
    >
      {OPTIONS.map((opt) => {
        // Conditional render / styling: the active
        // tab gets a lighter pill, the others stay
        // flat. Picking between two class strings
        // with a ternary.
        const isActive = filter === opt.key;
        const classes = isActive
          ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-neutral-100'
          : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-200';

        return (
          <button
            key={opt.key}
            role="tab"
            aria-selected={isActive}
            // Calling the parent's setter with the
            // new filter key. Parent owns the state,
            // we just raise our hand.
            onClick={() => onChange(opt.key)}
            className={`cursor-pointer flex-1 py-2 text-sm rounded-md transition-colors ${classes}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}