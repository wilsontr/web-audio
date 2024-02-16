"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../page.module.css";
import { useAudioContext, useDrunkWalk, useInterval } from "@/shared";

const minyoScale = [
  220.0, // A3
  246.94, // B3
  277.18, // C#4
  293.66, // D4
  329.63, // E4
  369.99, // F#4
  415.3, // G4
  440.0, // A4
  493.88, // B4
  554.37, // C#5
  587.33, // D5
  659.26, // E5
  739.99, // F#5
  830.61, // G5
  880.0, // A5
];

export default function DrunkWalk() {
  const [audioStarted, setAudioStarted] = useState(false);
  const oscillator = useRef<OscillatorNode | undefined>();
  const audioContext = useAudioContext();
  const { value, update } = useDrunkWalk({
    initialValue: 5,
    min: 0,
    max: minyoScale.length - 1,
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

  useInterval(() => {
    if (audioStarted) {
      update();
    }
  }, 500);

  useEffect(() => {
    if (audioContext) {
      oscillator.current?.frequency.setValueAtTime(
        minyoScale[value],
        audioContext?.currentTime
      );
    }
  }, [value, audioContext]);

  const handleStartClick = () => {
    if (audioStarted) {
      setAudioStarted(false);
      audioContext?.suspend();
    } else {
      setAudioStarted(true);
      audioContext?.resume();
    }
  };

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
            onClick={handleStartClick}
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
