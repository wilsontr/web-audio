"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../page.module.css";
import { useAudioContext } from "../shared";

export default function Test() {
  const audioContext = useAudioContext();
  const oscillator = useRef<OscillatorNode | undefined>();
  const panner = useRef<StereoPannerNode | undefined>();
  const pannerGain = useRef<GainNode | undefined>();
  const lfo = useRef<OscillatorNode | undefined>();
  const [audioStarted, setAudioStarted] = useState(false);

  useEffect(() => {
    if (audioContext) {
      oscillator.current = new OscillatorNode(audioContext, {
        frequency: 220,
        type: "sine",
      });
      panner.current = audioContext.createStereoPanner();
      pannerGain.current = audioContext.createGain();
      pannerGain.current.gain.value = 1;
      // create LFO and connect to panner gain (control amount of pan modulation)
      lfo.current = audioContext.createOscillator();
      lfo.current.frequency.value = 0.25;
      lfo.current.connect(pannerGain.current);
      // connect oscillator output to panner
      oscillator.current.connect(panner.current);
      // connect panner gain output to pan parameter
      pannerGain.current.connect(panner.current.pan);
      // connect panner to output
      panner.current.connect(audioContext.destination);
      // start oscillators
      oscillator.current.start();
      lfo.current.start();
    }
  }, [audioContext]);

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
      <a className="button is-rounded" href="/">
        back
      </a>
      <div className={styles.description}>
        <h1 className={styles.header}>
          220hz sine wave panning between channels at 0.25 hz
        </h1>
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
