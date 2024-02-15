"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../page.module.css";
import flocking from "flocking";

export default function FlockingTest() {
  // const audioContext = useRef<AudioContext | undefined>();
  // const oscillator = useRef<OscillatorNode | undefined>();
  // const panner = useRef<StereoPannerNode | undefined>();
  // const pannerGain = useRef<GainNode | undefined>();
  // const lfo = useRef<OscillatorNode | undefined>();
  const [audioStarted, setAudioStarted] = useState(false);
  useEffect(() => {}, []);

  const handleStartClick = () => {
    // if (audioStarted) {
    //   setAudioStarted(false);
    //   audioContext?.current?.suspend();
    // } else {
    //   setAudioStarted(true);
    //   audioContext.current?.resume();
    // }
  };

  return (
    <main className={styles.main}>
      <a className="button is-rounded" href="/">
        back
      </a>
      <div className={styles.description}>
        <h1 className={styles.header}>flocking test</h1>
      </div>
      <button
        onClick={handleStartClick}
        type="button"
        className="button is-primary is-rounded"
      >
        {audioStarted ? "stop" : "start"}
      </button>
    </main>
  );
}
