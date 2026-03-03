import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hello Canvas | Personalized Greetings',
  description: 'A simple, beautiful way to share a friendly hello.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background selection:bg-primary/30">
        {children}
      </body>
    </html>
  );
}
