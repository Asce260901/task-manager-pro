// ─────────────────────────────────────────────
// ThemeToggle — the sun/moon button
// What: flips between light and dark mode by
//       adding or removing a "dark" class on
//       the <html> element. Persists the choice
//       in localStorage so it survives refreshes.
// Type: Client Component (needs state + effects
//       + touches the DOM directly).
// Props: none — it owns its own theme state.
// ─────────────────────────────────────────────
'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  // Start as null so we can tell "haven't read
  // localStorage yet" from an actual value. On the
  // server there's no window, so we can't know the
  // user's pick until we're in the browser.
  const [theme, setTheme] = useState(null);

  // ── EFFECT #1: read the saved theme on mount ──
  // Empty dependency array [] means this runs ONCE
  // after the first client render. This is the right
  // place to touch localStorage because we know we're
  // in the browser by the time useEffect fires.
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    // Default to dark if nothing's saved, since the
    // app was designed dark-first.
    setTheme(saved || 'dark');
  }, []);

  // ── EFFECT #2: apply theme to <html> + save ──
  // Runs whenever theme changes. Syncing React state
  // with an external system (the DOM class AND
  // localStorage), which is exactly what useEffect
  // is for.
  useEffect(() => {
    // Skip the first run where theme is still null
    // (we haven't read from localStorage yet).
    if (theme === null) return;

    // Add or remove the .dark class on <html> so
    // Tailwind's dark: variants kick in everywhere.
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else                  root.classList.remove('dark');

    // Remember the choice for next visit.
    localStorage.setItem('theme', theme);
  }, [theme]);

  // While we don't know the theme yet, render nothing.
  // Stops the button from flashing the wrong icon.
  if (theme === null) return null;

  // Flip the theme. Functional setState form because
  // the new value depends on the old one — safer than
  // reading `theme` directly here.
  function toggle() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="cursor-pointer rounded-full p-2 text-neutral-600 hover:text-neutral-900
                 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
    >
      {/* Conditional render: sun when we're dark
          (tap to go light), moon when we're light. */}
      {isDark ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}