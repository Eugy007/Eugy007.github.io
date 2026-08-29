'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useActiveSection } from '@/lib/useActiveSection';

const SECTIONS = [
  { id: 'home', label: 'Hero' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function SystemHUD() {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const active = useActiveSection(onHome ? SECTIONS.map((s) => s.id) : []);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!onHome) return null;

  const index = Math.max(0, SECTIONS.findIndex((s) => s.id === active));
  const current = SECTIONS[index] ?? SECTIONS[0];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-6 left-6 z-30 hidden select-none items-center gap-3 rounded-full border border-line/70 bg-surface/60 px-4 py-2 font-mono text-[11px] text-muted backdrop-blur-md lg:flex"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      <span className="text-ink/80">
        {String(index + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
      </span>
      <span className="text-line">/</span>
      <span>{current.label}</span>
      <span className="ml-1 h-1 w-16 overflow-hidden rounded-full bg-line/70">
        <span
          className="block h-full bg-signal transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </span>
    </div>
  );
}
