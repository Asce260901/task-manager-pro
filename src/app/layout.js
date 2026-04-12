import './globals.css';

export const metadata = {
  title: 'My Task Manager',
  description: 'A minimal, mobile-friendly task manager.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors">
        {children}
      </body>
    </html>
  );
}