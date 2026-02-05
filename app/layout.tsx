import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DND5E资源不全集 - DND 模组库',
  description: 'A responsive DnD module archivist allowing users to search, filter, and find adventure modules via AI assistance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Using Tailwind CDN for quick setup compatibility, though PostCSS is recommended for Next.js prod */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400;600&family=Noto+Sans+SC:wght@300;400;500;700&family=Noto+Serif+SC:wght@400;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    heading: ['"Noto Serif SC"', 'Cinzel', 'serif'],
                    body: ['"Noto Sans SC"', 'Inter', 'sans-serif'],
                  },
                  colors: {
                    dnd: {
                      dark: '#0f172a',
                      card: '#1e293b',
                      accent: '#d97706',
                      text: '#e2e8f0',
                      muted: '#94a3b8'
                    }
                  },
                  spacing: {
                    'safe-top': 'env(safe-area-inset-top)',
                    'safe-bottom': 'env(safe-area-inset-bottom)',
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body className="bg-[#0f172a] text-[#e2e8f0] antialiased overscroll-none">
        {children}
      </body>
    </html>
  );
}