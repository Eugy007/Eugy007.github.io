'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import { hero, profile } from '@/data/site';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';
import { usePreloaderReady } from '@/lib/preloaderContext';
import HeroPortrait from './HeroPortrait';
import RotatingRole from './RotatingRole';

// How long the text's own stagger sequence takes to finish (6 items at 0.09s
// apart, 0.6s each), plus a small buffer - measured from the moment `ready`
// flips true, not from page load. This is independent of how long the
// preloader itself actually takes.
const PHOTO_ENTRANCE_DELAY = 1.3;
const SCROLL_CUE_DELAY = 1.5;

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const ready = usePreloaderReady();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
      <section ref={sectionRef} id="home" className="relative flex min-h-screen items-center pt-28 pb-16 sm:pt-32">
        <div className="mx-auto grid w-full max-w-shell grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[2fr_1fr] lg:gap-14">
          <motion.div
              variants={container}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
              style={reducedMotion ? undefined : { y: textY, opacity: textOpacity }}
          >
            <motion.p variants={item} className="mb-4 font-mono text-[13px] uppercase tracking-[0.08em] text-muted">
              {hero.eyebrow}
            </motion.p>

            <motion.h1
                variants={item}
                className="font-hero text-4xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:whitespace-nowrap lg:text-6xl"
            >
            <span className="bg-gradient-to-b from-ink to-mutedDim bg-clip-text text-transparent">
              {hero.headline}
            </span>
            </motion.h1>

            <motion.div variants={item} className="mt-3">
              <RotatingRole />
            </motion.div>

            <motion.p variants={item} className="mt-6 max-w-lg text-balance text-[1.05rem] leading-relaxed text-muted">
              {hero.subhead}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 font-mono text-sm font-medium text-bg transition-transform duration-200 hover:-translate-y-0.5"
              >
                View Projects
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                  href={profile.resumeHref}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-mono text-sm text-ink transition-colors duration-200 hover:border-ink"
              >
                Download CV
                <Download size={15} />
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-6">
              <a href="#contact" className="font-mono text-sm text-muted underline decoration-line underline-offset-4 hover:text-ink">
                or say hello &rarr;
              </a>
            </motion.div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              transition={{
                duration: reducedMotion ? 0.3 : 0.7,
                delay: reducedMotion ? 0 : PHOTO_ENTRANCE_DELAY,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={reducedMotion ? undefined : { y: photoY }}
          >
            <HeroPortrait src={profile.avatar} alt={profile.name} />
          </motion.div>
        </div>

        <motion.a
            href="#projects"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: reducedMotion ? 0 : SCROLL_CUE_DELAY, duration: reducedMotion ? 0.3 : 0.6 }}
            aria-label="Scroll to projects"
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] text-mutedDim sm:flex"
        >
          scroll
          <ArrowDown size={14} className="animate-bounce" />
        </motion.a>
      </section>
  );
}