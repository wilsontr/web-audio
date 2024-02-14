"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function Test() {
  const audioContext = useRef<AudioContext | undefined>();
  const oscillator = useRef<OscillatorNode | undefined>();
  const [audioStarted, setAudioStarted] = useState(false);
  useEffect(() => {
    const AudioContext =
      typeof window !== "undefined"
        ? window.AudioContext || window.webkitAudioContext // @ts-ignore
        : undefined;
    if (AudioContext) {
      audioContext.current = new AudioContext();
      console.log("audioContext", audioContext);
      oscillator.current = new OscillatorNode(audioContext.current, {
        frequency: 220,
        type: "sine",
      });
      oscillator.current.connect(audioContext.current.destination);
      oscillator.current.start();
    }
  }, [audioContext]);

  const handleStartClick = () => {
    if (audioStarted) {
      setAudioStarted(false);
      audioContext?.current?.suspend();
    } else {
      setAudioStarted(true);
      audioContext.current?.resume();
    }
  };

  return (
    <main className={styles.main}>
      <h1>test</h1>
      <button onClick={handleStartClick} type="button">
        {audioStarted ? "stop" : "start"}
      </button>
    </main>
  );
}
