'use client';

import { useState } from 'react';
import Preloader from './Preloader';
import { PreloaderReadyContext } from '@/lib/preloaderContext';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
      <PreloaderReadyContext.Provider value={!loading}>
        {loading && <Preloader onDone={() => setLoading(false)} />}
        {children}
      </PreloaderReadyContext.Provider>
  );
}