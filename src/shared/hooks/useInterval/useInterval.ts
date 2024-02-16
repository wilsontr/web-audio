import React, { useState, useEffect, useRef, useCallback } from 'react';
import { UseIntervalParams } from './useInterval.model';
 
export const useInterval = ({ callback, delay }: UseIntervalParams) => {
  const savedCallback = useRef<() => void | undefined>();
  const intervalId = useRef<NodeJS.Timeout | undefined>();
 
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const tick = useCallback(() => {
    if (savedCallback.current) {
      savedCallback.current();
    }
  }, [savedCallback]);

  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      intervalId.current = setInterval(tick, delay)
      return () => clearInterval(intervalId.current);
    }
  }, [delay]);
}