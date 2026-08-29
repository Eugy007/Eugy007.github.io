'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github, Layers, Wrench } from 'lucide-react';
import type { Project } from '@/data/site';

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="relative pb-28 pt-32 sm:pt-36">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-[13px] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} /> Back to projects
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-display-md font-semibold text-ink"
        >
          {project.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-2xl leading-relaxed text-muted"
        >
          {project.description}
        </motion.p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-line shadow-card"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.image} alt={`${project.name} preview`} className="w-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-line bg-surface p-4">
                <Wrench size={16} className="text-signal" />
                <p className="mt-2 font-mono text-lg font-semibold text-ink">{project.stack.length}</p>
                <p className="font-mono text-[11px] text-mutedDim">Technologies used</p>
              </div>
              <div className="rounded-xl border border-line bg-surface p-4">
                <Layers size={16} className="text-signal" />
                <p className="mt-2 font-mono text-lg font-semibold text-ink">{project.features.length}</p>
                <p className="font-mono text-[11px] text-mutedDim">Key features</p>
              </div>
            </div>

            <div>
              <p className="mb-2 font-mono text-[12px] text-mutedDim">Technologies used</p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-line bg-surface2 px-2.5 py-1 font-mono text-[11px] text-ink"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-mono text-[13px] font-medium text-bg transition-transform hover:-translate-y-0.5"
                >
                  View live <ArrowUpRight size={14} />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-[13px] text-ink transition-colors hover:border-ink"
                >
                  <Github size={14} /> Source
                </a>
              )}
              {project.linkNote && (
                <p className="flex items-center font-mono text-[12px] text-mutedDim">{project.linkNote}</p>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 max-w-2xl"
        >
          <h2 className="font-display text-lg font-semibold text-ink">Key features</h2>
          <ul className="mt-4 space-y-3">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-amber" />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </main>
  );
}
