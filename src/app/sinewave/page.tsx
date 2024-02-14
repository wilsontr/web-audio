"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function Test() {
  const audioContext = useRef<AudioContext | undefined>();
  const oscillator = useRef<OscillatorNode | undefined>();
  const panner = useRef<StereoPannerNode | undefined>();
  const pannerGain = useRef<GainNode | undefined>();
  const lfo = useRef<OscillatorNode | undefined>();
  const [audioStarted, setAudioStarted] = useState(false);
  useEffect(() => {
    const AudioContext =
      typeof window !== "undefined"
        ? window.AudioContext || window.webkitAudioContext
        : undefined;
    if (AudioContext) {
      audioContext.current = new AudioContext();
      console.log("audioContext", audioContext);
      oscillator.current = new OscillatorNode(audioContext.current, {
        frequency: 220,
        type: "sine",
      });
      panner.current = audioContext.current.createStereoPanner();
      pannerGain.current = audioContext.current.createGain();
      pannerGain.current.gain.value = 1;
      // create LFO and connect to panner gain (control amount of pan modulation)
      lfo.current = audioContext.current.createOscillator();
      lfo.current.frequency.value = 0.25;
      lfo.current.connect(pannerGain.current);
      // connect oscillator output to panner
      oscillator.current.connect(panner.current);
      // connect panner gain output to pan parameter
      pannerGain.current.connect(panner.current.pan);
      // connect panner to output
      panner.current.connect(audioContext.current.destination);
      // start oscillators
      oscillator.current.start();
      lfo.current.start();
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
      <a className="button is-rounded" href="/">
        back
      </a>
      <h1>220hz sine wave panning between channels at 0.25 hz</h1>
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
