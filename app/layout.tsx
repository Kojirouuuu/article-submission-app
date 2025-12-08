import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zenn Clone App",
  description: "A simple Zenn clone built with Next.js and Prisma for learning purposes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <header className="border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
            <a href="/" className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-brand" />
              <span className="text-base font-semibold">Zenn Clone</span>
            </a>
            <a href="/posts/new" className="btn btn-primary">New Post</a>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-6">
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </main>
        <footer className="mx-auto max-w-4xl px-4 pb-8 text-xs text-neutral-500">
          <span>Built with Next.js + Prisma</span>
        </footer>
      </body>
    </html>
  );
}
