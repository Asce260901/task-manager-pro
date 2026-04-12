import './globals.css';

export const metadata = {
  title: 'My Task Manager',
  description: 'A minimal, dark, mobile-friendly task manager.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-950 text-neutral-100">
        {children}
      </body>
    </html>
  );
}