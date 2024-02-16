"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../page.module.css";
import { useAudioContext, useDrunkWalk, useTimeout } from "@/shared/hooks";
import { iwatoScale } from "@/shared/scales";

export default function VariableTime() {
  const oscillator = useRef<OscillatorNode | undefined>();
  const { audioContext, handleAudioToggle, audioStarted } = useAudioContext();
  const { value: noteValue, update: updateNote } = useDrunkWalk({
    initialValue: 5,
    min: 0,
    max: iwatoScale.length - 1,
  });

  const { value: timeValue, update: updateTimeValue } = useDrunkWalk({
    initialValue: 250,
    min: 50,
    max: 500,
    stepSize: 50,
  });

  useEffect(() => {
    if (audioContext) {
      oscillator.current = new OscillatorNode(audioContext, {
        frequency: 220,
        type: "sine",
      });
      oscillator.current.connect(audioContext.destination);
      oscillator.current.start();
    }
  }, [audioContext]);

  const handleTimeout = useCallback(() => {
    updateNote();
    updateTimeValue();
  }, [updateNote, updateTimeValue]);

  const { setTimeoutLength, startTimeout } = useTimeout({
    callback: handleTimeout,
    timeout: 250,
  });

  useEffect(() => {
    if (audioStarted) {
      startTimeout(timeValue);
    }
  }, [timeValue, audioStarted]);

  useEffect(() => {
    if (audioContext) {
      oscillator.current?.frequency.setValueAtTime(
        iwatoScale[noteValue],
        audioContext?.currentTime
      );
    }
  }, [noteValue, audioContext]);

  useEffect(() => {
    if (audioStarted) {
      startTimeout();
    }
  }, [audioStarted]);

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.description}>
          <h1 className={styles.header}>variable time</h1>
          <p>
            a sine wave moving through an Iwato scale using a random walk
            algorithm to control note value and time between note changes
          </p>
        </div>
        <div className="level">
          <a className="button is-rounded" href="/">
            back
          </a>
          <button
            onClick={handleAudioToggle}
            type="button"
            className="button is-primary is-rounded"
          >
            {audioStarted ? "stop" : "start"}
          </button>
        </div>
      </div>
    </main>
  );
}
