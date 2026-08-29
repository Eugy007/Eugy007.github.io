'use client';

import { createContext, useContext } from 'react';

export const PreloaderReadyContext = createContext(false);

export function usePreloaderReady(): boolean {
  return useContext(PreloaderReadyContext);
}
