'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';
import StaticHangingPhoto from './StaticHangingPhoto';

interface HangingCardProps {
    photoSrc: string;
    alt: string;
    entranceDelay?: number;
}

const IDLE_SWAY = {
    rotate: [1.5, -1.5, 1.5],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const },
};

export default function HangingCard({ photoSrc, alt, entranceDelay = 0 }: HangingCardProps) {
    const reducedMotion = usePrefersReducedMotion();
    const [settled, setSettled] = useState(false);

    // Drag on the x-axis drives a small rotation on top of the card's resting
    // tilt, so dragging left/right visibly tips the card in that direction.
    const x = useMotionValue(0);
    const dragRotate = useTransform(x, [-80, 0, 80], [-16, -3, 10]);

    if (reducedMotion) {
        return <StaticHangingPhoto src={photoSrc} alt={alt} />;
    }

    return (
        <div className="mx-auto w-full max-w-[260px] touch-none select-none sm:max-w-[300px] lg:mx-0 lg:max-w-[400px]">
            <motion.div
                initial={{ opacity: 0, y: -70, rotate: -9 }}
                animate={settled ? IDLE_SWAY : { opacity: 1, y: 0, rotate: 0 }}
                transition={
                    settled
                        ? undefined
                        : { type: 'spring', stiffness: 90, damping: 9, delay: entranceDelay }
                }
                onAnimationComplete={() => setSettled(true)}
                style={{ transformOrigin: 'top center' }}
            >
                {/* strap */}
                <div className="mx-auto h-16 w-[3px] rounded-full bg-gradient-to-b from-mutedDim to-line sm:h-20 lg:h-24" />
                <div className="mx-auto -mt-1.5 h-3 w-3 rounded-full border-2 border-mutedDim bg-bg" />

                {/* draggable card: white frame, thin dark mat, photo */}
                <motion.div
                    drag
                    dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                    dragElastic={0.55}
                    dragTransition={{ bounceStiffness: 260, bounceDamping: 18 }}
                    whileDrag={{ scale: 1.03 }}
                    style={{ x, rotate: dragRotate }}
                    className="relative -mt-1 cursor-grab rounded-md border-[6px] border-[#f2f2f0] bg-[#f2f2f0] p-[3px] shadow-card active:cursor-grabbing"
                >
                    <div className="overflow-hidden rounded-sm bg-[#0c0e14] p-[2px]">
                        <div className="aspect-[4/5] w-full overflow-hidden rounded-[1px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={photoSrc}
                                alt={alt}
                                draggable={false}
                                className="h-full w-full object-cover object-top"
                            />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}