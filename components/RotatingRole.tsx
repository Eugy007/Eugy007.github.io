'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

const ROLES = ['Software Developer', 'Full-Stack Developer', 'Systems Builder', 'IT Technician'];

const TYPE_SPEED = 55;
const DELETE_SPEED = 30;
const PAUSE_AFTER_TYPE = 1400;
const PAUSE_AFTER_DELETE = 300;

export default function RotatingRole() {
    const reducedMotion = usePrefersReducedMotion();
    const [roleIndex, setRoleIndex] = useState(0);
    const [text, setText] = useState(reducedMotion ? ROLES[0] : '');
    const [phase, setPhase] = useState<'typing' | 'deleting'>('typing');

    useEffect(() => {
        if (reducedMotion) return;
        const currentRole = ROLES[roleIndex];

        if (phase === 'typing') {
            if (text.length < currentRole.length) {
                const t = setTimeout(() => setText(currentRole.slice(0, text.length + 1)), TYPE_SPEED);
                return () => clearTimeout(t);
            }
            const t = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE);
            return () => clearTimeout(t);
        }

        // deleting
        if (text.length > 0) {
            const t = setTimeout(() => setText(currentRole.slice(0, text.length - 1)), DELETE_SPEED);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => {
            setRoleIndex((i) => (i + 1) % ROLES.length);
            setPhase('typing');
        }, PAUSE_AFTER_DELETE);
        return () => clearTimeout(t);
    }, [text, phase, roleIndex, reducedMotion]);

    return (
        <div className="flex h-6 items-center font-mono text-sm text-signal">
            <span>{text}</span>
            <span className={reducedMotion ? 'ml-0.5' : 'ml-0.5 animate-blink'} aria-hidden="true">
        _
      </span>
        </div>
    );
}