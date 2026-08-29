'use client';

import { motion } from 'framer-motion';
import { skillGroups } from '@/data/site';
import SectionHeading from './SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <SectionHeading
          eyebrow="What I reach for"
          title="Skills & Technologies"
          description="Grouped by where each one sits in a system, not a badge wall."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-line bg-surface p-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-wide text-mutedDim">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">{group.label}</h3>
              <p className="mt-1 text-[13px] text-muted">{group.note}</p>
              <ul className="mt-5 space-y-2.5">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2.5 font-mono text-[13px] text-ink">
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-signal" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
