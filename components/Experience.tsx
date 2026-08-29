'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';
import { timeline } from '@/data/site';
import SectionHeading from './SectionHeading';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <SectionHeading eyebrow="How I got here" title="Experience" />

        <div className="relative ml-3 border-l border-line pl-8 sm:ml-6 sm:pl-10">
          {timeline.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative pb-12 last:pb-0"
            >
              <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-signal bg-bg text-signal sm:-left-[49px]">
                {entry.kind === 'education' ? <GraduationCap size={12} /> : <Briefcase size={12} />}
              </span>

              <p className="font-mono text-[12px] text-mutedDim">
                {entry.date}
                {entry.location ? `, ${entry.location}` : ''}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold text-ink">{entry.title}</h3>
              <p className="mt-0.5 font-mono text-[13px] text-signal">{entry.org}</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{entry.description}</p>

              {entry.tools && entry.tools.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {entry.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-line bg-surface2 px-2 py-0.5 font-mono text-[11px] text-ink"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
