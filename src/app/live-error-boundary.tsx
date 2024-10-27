"use client";

import { useEffect } from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  type FallbackProps,
} from "react-error-boundary";

export function LiveErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={Fallback}>
      {children}
    </ReactErrorBoundary>
  );
}

function Fallback({ error }: FallbackProps) {
  useEffect(() => {
    const msg = "Couldn't connect to Live Content API";
    console.error(`${msg}: `, error);
  }, [error]);

  return null;
}
