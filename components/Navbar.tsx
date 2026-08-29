'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { nav } from '@/data/site';
import { useActiveSection } from '@/lib/useActiveSection';

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const resolveHref = (href: string) => (onHome ? href : `/${href}`);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(onHome ? nav.map((n) => n.href.replace('#', '')) : []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled || !onHome ? 'border-b border-line/70 bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-shell items-center justify-between px-5 sm:px-8">
        <a href={resolveHref('#home')} className="font-mono text-sm font-medium text-ink" aria-label="Back to top">
          eugene<span className="text-mutedDim">.dev</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const isActive = onHome && active === item.href.replace('#', '');
            return (
              <li key={item.href}>
                <a
                  href={resolveHref(item.href)}
                  className={clsx(
                    'relative rounded-full px-4 py-2 font-mono text-[13px] transition-colors',
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-surface2 ring-1 ring-line"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="border-b border-line/70 bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={resolveHref(item.href)}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 font-mono text-sm text-muted transition-colors hover:bg-surface2 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
