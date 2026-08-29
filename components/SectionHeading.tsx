'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-14 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <p className="mb-3 font-mono text-[13px] tracking-wide text-signal">{eyebrow}</p>
      <h2 className="font-display text-display-md font-semibold text-ink">{title}</h2>
      {description && <p className="mt-4 text-balance leading-relaxed text-muted">{description}</p>}
    </motion.div>
  );
}
