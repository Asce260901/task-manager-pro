// ─────────────────────────────────────────────
// FilterBar — the All / Active / Done tabs
// What: three buttons that pick which tasks show.
//       Doesn't own any state — current filter
//       lives up in TaskBoard and gets passed in.
// Type: Client Component (needs onClick).
// Props: filter   — which tab is active
//        onChange — callback(newFilter) on click
// ─────────────────────────────────────────────
'use client';

// Declared outside so this array isn't rebuilt on
// every render. Tiny optimization, clearer code.
const OPTIONS = [
  { key: 'all',    label: 'All'    },
  { key: 'active', label: 'Active' },
  { key: 'done',   label: 'Done'   },
];

export default function FilterBar({ filter, onChange }) {
  return (
    <div
      // role="tablist" signals to screen readers
      // that these buttons are a related group.
      role="tablist"
      className="flex gap-1 mb-4 p-1 rounded-lg bg-neutral-100 dark:bg-neutral-900"
    >
      {OPTIONS.map((opt) => {
        // Conditional styling: active tab gets a lifted
        // pill, inactive ones stay flat. Ternary picking
        // between two class strings.
        const isActive = filter === opt.key;
        const classes = isActive
          ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-neutral-100'
          : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-200';

        return (
          <button
            key={opt.key}
            role="tab"
            aria-selected={isActive}
            // Call the parent's setter with the new
            // filter key. Parent owns the state.
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