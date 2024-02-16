import React, { useState, useEffect, useRef, useCallback } from 'react';
import { UseTimeoutParams } from './useTimeout.model';

export const useTimeout = ({ callback, timeout: initialTimeout }: UseTimeoutParams) => {
  const savedCallback = useRef<() => void | undefined>();
  const timeoutId = useRef<NodeJS.Timeout | undefined>();
  const [timeoutLength, setTimeoutLength] = useState(initialTimeout);
 
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const tick = useCallback(() => {
    if (savedCallback.current) {
      savedCallback.current();
    }
  }, [savedCallback])

  const startTimeout = useCallback((newTimeoutLength?: number) => {
    const nextTimeout = newTimeoutLength || timeoutLength;
    timeoutId.current = setTimeout(tick, timeoutLength);
    setTimeoutLength(nextTimeout);
  }, [timeoutId, tick, timeoutLength]);
 
  // Set up the timeout.
  useEffect(() => {
    return () => clearTimeout(timeoutId.current);
  }, []);

  return { setTimeoutLength, startTimeout };
}