"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../page.module.css";
import { useAudioContext, useDrunkWalk, useInterval } from "@/shared/hooks";
import { minyoScale } from "@/shared/scales";

export default function DrunkWalk() {
  const oscillator = useRef<OscillatorNode | undefined>();
  const { audioContext, handleAudioToggle, audioStarted } = useAudioContext();
  const { value, update } = useDrunkWalk({
    initialValue: 5,
    min: 0,
    max: minyoScale.length - 1,
    stepSize: 1,
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

  useInterval({
    callback: () => {
      if (audioStarted) {
        update();
      }
    },
    delay: 500,
  });

  useEffect(() => {
    if (audioContext) {
      oscillator.current?.frequency.setValueAtTime(
        minyoScale[value],
        audioContext?.currentTime
      );
    }
  }, [value, audioContext]);

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.description}>
          <h1 className={styles.header}>drunk walk</h1>
          <p>
            a sine wave moving through a Minyo scale using a random walk
            algorithm
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
