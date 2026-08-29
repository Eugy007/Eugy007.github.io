'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code2, Globe, User } from 'lucide-react';
import { preloader } from '@/data/site';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

const ICONS = [Code2, User, Globe];

// Full-motion timings (ms), loosely following: icons ~0.2-0.6s, welcome text
// ~0.55-1.15s, url ~1.0-1.55s, hold so it can actually be read until ~2.2s,
// then a two-stage exit (content fades/blurs, then the panel itself slides
// away) finishing around the 3s mark.
const HOLD_END = 2200;
const PANEL_EXIT_DELAY = 200;
const PANEL_EXIT_DURATION = 0.6;
const CONTENT_FADE_DURATION = 0.35;

// Reduced-motion timings: still perceivable, none of the staggered detail.
const REDUCED_HOLD_END = 400;
const REDUCED_PANEL_EXIT_DELAY = 80;
const REDUCED_PANEL_EXIT_DURATION = 0.25;
const REDUCED_CONTENT_FADE_DURATION = 0.15;

export default function Preloader({ onDone }: { onDone: () => void }) {
  const reducedMotion = usePrefersReducedMotion();
  const [panelVisible, setPanelVisible] = useState(true);
  const [contentFading, setContentFading] = useState(false);

  const holdEnd = reducedMotion ? REDUCED_HOLD_END : HOLD_END;
  const panelExitDelay = reducedMotion ? REDUCED_PANEL_EXIT_DELAY : PANEL_EXIT_DELAY;
  const panelExitDuration = reducedMotion ? REDUCED_PANEL_EXIT_DURATION : PANEL_EXIT_DURATION;
  const contentFadeDuration = reducedMotion ? REDUCED_CONTENT_FADE_DURATION : CONTENT_FADE_DURATION;

  useEffect(() => {
    const fadeTimer = setTimeout(() => setContentFading(true), holdEnd);
    const exitTimer = setTimeout(() => setPanelVisible(false), holdEnd + panelExitDelay);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(exitTimer);
    };
  }, [holdEnd, panelExitDelay]);

  useEffect(() => {
    document.body.style.overflow = panelVisible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [panelVisible]);

  return (
      <AnimatePresence onExitComplete={onDone}>
        {panelVisible && (
            <motion.div
                key="preloader-panel"
                exit={{ y: '-100%', transition: { duration: panelExitDuration, ease: [0.76, 0, 0.24, 1] } }}
                className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
            >
              <motion.div
                  animate={
                    contentFading
                        ? { opacity: 0, y: -10, filter: 'blur(6px)' }
                        : { opacity: 1, y: 0, filter: 'blur(0px)' }
                  }
                  transition={{ duration: contentFadeDuration, ease: 'easeOut' }}
                  className="flex flex-col items-center"
              >
                <div className="mb-7 flex items-center gap-3">
                  {ICONS.map((Icon, i) => (
                      <motion.span
                          key={i}
                          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.6, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: reducedMotion ? 0 : 0.2 + i * 0.13,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-signal"
                      >
                        <Icon size={15} />
                      </motion.span>
                  ))}
                </div>

                <motion.p
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="text-balance text-center font-display text-2xl font-semibold text-ink sm:text-3xl"
                >
                  {preloader.line1}
                  <br />
                  {preloader.line2}
                </motion.p>

                <motion.p
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: reducedMotion ? 0 : 1.0, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-mutedDim"
                >
                  {preloader.url}
                </motion.p>
              </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
  );
}