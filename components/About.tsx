'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { about, hero } from '@/data/site';
import SectionHeading from './SectionHeading';

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <SectionHeading eyebrow="Who's building this" title={about.title} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            {about.facts.map((fact) => (
              <div key={fact.label} className="rounded-xl border border-line bg-surface px-4 py-3.5">
                <p className="font-mono text-[11px] text-mutedDim">{fact.label}</p>
                <p className="mt-1 text-sm font-medium text-ink">{fact.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-sm text-signal">{hero.eyebrow}</p>

            <div className="mt-4 space-y-4">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-7 inline-flex items-center gap-2 font-mono text-sm text-ink underline decoration-line underline-offset-4 hover:text-signal"
            >
              Get in touch <ArrowUpRight size={15} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
