'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

export default function GridBackground() {
    const reducedMotion = usePrefersReducedMotion();
    const { scrollYProgress } = useScroll();
    // Extremely slow drift across the whole page scroll - reads as depth, not motion.
    const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

    return (
        <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-bg">
            <motion.div
                className="absolute inset-0 bg-grid fade-mask-b opacity-60"
                style={reducedMotion ? undefined : { y: gridY }}
            />
            <div className="absolute -top-40 left-[-10%] h-[440px] w-[440px] rounded-full bg-signal/[0.05] blur-[160px]" />
            <div className="absolute bottom-[-15%] right-[-10%] h-[400px] w-[400px] rounded-full bg-amber/[0.04] blur-[170px]" />
        </div>
    );
}