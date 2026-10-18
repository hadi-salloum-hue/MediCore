'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import DemoDialog from './DemoDialog';

interface DemoDialogContextValue {
  open: () => void;
}

const DemoDialogContext = createContext<DemoDialogContextValue | null>(null);

export function useDemoDialog(): DemoDialogContextValue {
  const context = useContext(DemoDialogContext);
  if (!context) throw new Error('useDemoDialog must be used inside <DemoDialogProvider>');
  return context;
}

export function DemoDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <DemoDialogContext.Provider value={value}>
      {children}
      <DemoDialog open={isOpen} onOpenChange={setIsOpen} />
    </DemoDialogContext.Provider>
  );
}
