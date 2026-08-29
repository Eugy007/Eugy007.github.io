'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { projects, projectFilters, skillGroups, type ProjectCategory } from '@/data/site';
import SectionHeading from './SectionHeading';

type Tab = 'projects' | 'stack';

const allSkills = skillGroups.flatMap((g) => g.skills);
const tickerSkills = [...allSkills, ...allSkills];

export default function ProjectPortfolio() {
  const [tab, setTab] = useState<Tab>('projects');
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>('All');

  const filtered = useMemo(
      () =>
          filter === 'All'
              ? projects
              : projects.filter((p) => p.category.includes(filter as ProjectCategory)),
      [filter]
  );

  return (
      <section id="projects" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-shell px-5 sm:px-8">
          <SectionHeading
              eyebrow="Selected work"
              title="Projects"
              description="A few systems built end to end: schema, API, and the interface someone actually uses. Click into one for the full story."
          />

          <div className="mb-10 inline-flex rounded-full border border-line bg-surface p-1">
            {(
                [
                  { id: 'projects' as Tab, label: 'Projects' },
                  { id: 'stack' as Tab, label: 'Tech Stack' },
                ]
            ).map((t) => (
                <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={clsx(
                        'relative rounded-full px-5 py-2 font-mono text-[13px] transition-colors',
                        tab === t.id ? 'text-bg' : 'text-muted hover:text-ink'
                    )}
                >
                  {tab === t.id && (
                      <motion.span
                          layoutId="projects-tab-pill"
                          className="absolute inset-0 rounded-full bg-signal"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === 'projects' ? (
                <motion.div
                    key="projects-tab"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                >
                  <div className="mb-8 flex flex-wrap gap-2">
                    {projectFilters.map((f) => (
                        <button
                            key={f}
                            type="button"
                            onClick={() => setFilter(f)}
                            className={clsx(
                                'rounded-full border px-4 py-2 font-mono text-[13px] transition-colors',
                                filter === f
                                    ? 'border-signal bg-signal/10 text-signal'
                                    : 'border-line text-muted hover:border-mutedDim hover:text-ink'
                            )}
                        >
                          {f}
                        </button>
                    ))}
                  </div>

                  <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                      {filtered.map((project, i) => (
                          <motion.div
                              key={project.slug}
                              layout
                              initial={{ opacity: 0, y: 24 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: '-60px' }}
                              exit={{ opacity: 0, y: -12 }}
                              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <Link
                                href={`/projects/${project.slug}`}
                                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-signal/40"
                            >
                              <div className="overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={project.image}
                                    alt={`${project.name} preview`}
                                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                              </div>

                              <div className="flex flex-1 flex-col gap-3 p-5">
                                <h3 className="font-display text-base font-semibold text-ink">{project.name}</h3>
                                <p className="text-sm leading-relaxed text-muted">{project.summary}</p>

                                <div className="flex flex-wrap gap-1.5">
                                  {project.stack.slice(0, 3).map((t) => (
                                      <span
                                          key={t}
                                          className="rounded-md border border-signal/20 bg-signal/[0.07] px-2 py-0.5 font-mono text-[11px] text-signal"
                                      >
                                {t}
                              </span>
                                  ))}
                                </div>

                                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-mono text-[13px] font-medium text-ink group-hover:text-signal">
                            Details
                            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                          </span>
                              </div>
                            </Link>
                          </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {filtered.length === 0 && (
                      <div className="rounded-2xl border border-dashed border-line py-16 text-center font-mono text-sm text-mutedDim">
                        No projects filed under &ldquo;{filter}&rdquo; yet.
                      </div>
                  )}
                </motion.div>
            ) : (
                <motion.div
                    key="stack-tab"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/40 py-8">
                    <div className="flex w-max animate-marquee gap-8 font-mono text-sm text-mutedDim">
                      {tickerSkills.map((skill, i) => (
                          <span key={`${skill}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
                      {skill}
                            <span className="text-signal/50">/</span>
                    </span>
                      ))}
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface to-transparent" />
                  </div>
                  <a
                      href="#skills"
                      className="mt-5 inline-flex items-center gap-1.5 font-mono text-[13px] text-muted hover:text-signal"
                  >
                    Full breakdown in Skills <ArrowRight size={13} />
                  </a>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
  );
}