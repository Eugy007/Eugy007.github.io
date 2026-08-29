'use client';

import { usePathname } from 'next/navigation';
import { Github, Linkedin, Mail } from 'lucide-react';
import { nav, profile } from '@/data/site';

export default function Footer() {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const resolveHref = (href: string) => (onHome ? href : `/${href}`);

  return (
    <footer className="relative border-t border-line py-10">
      <div className="mx-auto flex max-w-shell flex-col items-center gap-6 px-5 sm:px-8 md:flex-row md:justify-between">
        <p className="font-mono text-[13px] text-mutedDim">
          {profile.name} <span className="text-line">/</span> {new Date().getFullYear()}
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={resolveHref(item.href)} className="font-mono text-[13px] text-muted transition-colors hover:text-ink">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {[
            { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
            { href: profile.github, icon: Github, label: 'GitHub' },
            { href: profile.linkedin, icon: Linkedin, label: 'LinkedIn' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-signal hover:text-signal"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
